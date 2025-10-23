import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import mysql from "mysql2/promise";

// JWT secret key
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mirai-network-jwt-secret-change-in-production"
);

// Helper function to create JWT token
async function createToken(userId: string): Promise<string> {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// Helper function to verify JWT token
async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

// Get database connection
async function getDbConnection() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    // Parse MySQL URL: mysql://user:pass@host:port/database
    const url = new URL(dbUrl);
    
    const connection = await mysql.createConnection({
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
      ssl: {
        rejectUnauthorized: true,
      },
      connectTimeout: 10000,
    });

    return connection;
  } catch (error: any) {
    console.error("Database connection error:", error);
    throw new Error(`Database connection failed: ${error.message}`);
  }
}

// Parse cookies from request
function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const parts = cookie.trim().split('=');
    if (parts.length === 2) {
      cookies[parts[0]] = decodeURIComponent(parts[1]);
    }
    return cookies;
  }, {} as Record<string, string>);
}

// Set cookie in response
function setCookie(res: VercelResponse, name: string, value: string, options: any = {}) {
  const {
    httpOnly = true,
    secure = true,
    sameSite = 'none',
    maxAge = 1000 * 60 * 60 * 24 * 7, // 7 days
    path = '/',
  } = options;

  const cookieParts = [
    `${name}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    `Max-Age=${Math.floor(maxAge / 1000)}`,
  ];

  if (httpOnly) cookieParts.push('HttpOnly');
  if (secure) cookieParts.push('Secure');
  cookieParts.push(`SameSite=${sameSite}`);

  res.setHeader('Set-Cookie', cookieParts.join('; '));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const path = req.url?.split('?')[0] || '';

  try {
    // GET /api/auth/test - Database connection test
    if (req.method === 'GET' && path === '/api/auth/test') {
      try {
        const connection = await getDbConnection();
        
        // Test query
        const [rows] = await connection.execute('SELECT 1 as test');
        
        await connection.end();
        
        return res.status(200).json({ 
          success: true, 
          message: "Database connection OK",
          test: rows,
          env: {
            hasDatabaseUrl: !!process.env.DATABASE_URL,
            hasJwtSecret: !!process.env.JWT_SECRET,
          }
        });
      } catch (error: any) {
        return res.status(500).json({ 
          error: "Database connection failed",
          message: error.message,
          stack: error.stack
        });
      }
    }

    // POST /api/auth/login
    if (req.method === 'POST' && path === '/api/auth/login') {
      const { email, password } = req.body || {};

      if (!email || !password) {
        return res.status(400).json({ error: "メールアドレスとパスワードを入力してください" });
      }

      let connection;
      try {
        console.log("[Login] Starting login process for email:", email);
        connection = await getDbConnection();

        const [rows] = await connection.execute(
          'SELECT * FROM users WHERE email = ? LIMIT 1',
          [email]
        );

        const users = rows as any[];

        if (users.length === 0) {
          return res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません" });
        }

        const user = users[0];

        if (!user.password) {
          return res.status(401).json({ error: "このアカウントはパスワードログインに対応していません" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません" });
        }

        // Update last signed in
        await connection.execute(
          'UPDATE users SET lastSignedIn = NOW() WHERE id = ?',
          [user.id]
        );

        // Create JWT token
        const token = await createToken(user.id);

        // Set cookie
        setCookie(res, 'auth_token', token);

        console.log("[Login] Login successful for user:", user.id);
        
        return res.status(200).json({
          success: true,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            facility: user.facility,
          },
        });
      } catch (error: any) {
        console.error("[Login] Error during login:", error);
        return res.status(500).json({ 
          error: "ログイン処理中にエラーが発生しました",
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
      } finally {
        if (connection) {
          await connection.end();
        }
      }
    }

    // POST /api/auth/logout
    if (req.method === 'POST' && path === '/api/auth/logout') {
      setCookie(res, 'auth_token', '', { maxAge: -1 });
      return res.status(200).json({ success: true, message: "ログアウトしました" });
    }

    // GET /api/auth/me
    if (req.method === 'GET' && path === '/api/auth/me') {
      const cookies = parseCookies(req.headers.cookie);
      const token = cookies.auth_token;

      if (!token) {
        return res.status(401).json({ error: "認証が必要です" });
      }

      const payload = await verifyToken(token);
      if (!payload) {
        return res.status(401).json({ error: "無効なトークンです" });
      }

      let connection;
      try {
        connection = await getDbConnection();

        const [rows] = await connection.execute(
          'SELECT * FROM users WHERE id = ? LIMIT 1',
          [payload.userId]
        );

        const users = rows as any[];

        if (users.length === 0) {
          return res.status(401).json({ error: "ユーザーが見つかりません" });
        }

        const user = users[0];

        return res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          facility: user.facility,
        });
      } finally {
        if (connection) {
          await connection.end();
        }
      }
    }

    // POST /api/auth/register/public
    if (req.method === 'POST' && path === '/api/auth/register/public') {
      const { name, email, password, facility } = req.body || {};

      if (!name || !email || !password) {
        return res.status(400).json({ error: "必須項目が不足しています" });
      }

      let connection;
      try {
        connection = await getDbConnection();

        // Check if email already exists
        const [existing] = await connection.execute(
          'SELECT * FROM users WHERE email = ? LIMIT 1',
          [email]
        );

        if ((existing as any[]).length > 0) {
          return res.status(400).json({ error: "このメールアドレスは既に登録されています" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate user ID
        const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Insert user
        await connection.execute(
          'INSERT INTO users (id, name, email, password, role, facility, loginMethod) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [userId, name, email, hashedPassword, 'user', facility || null, 'password']
        );

        return res.status(200).json({
          success: true,
          message: "ユーザーを登録しました",
        });
      } finally {
        if (connection) {
          await connection.end();
        }
      }
    }

    return res.status(404).json({ error: "Not found" });
  } catch (error: any) {
    console.error("Auth API error:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

