import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getDb } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import session from "express-session";

const router = Router();

// Extend Express Request type for session
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      session: session.Session & Partial<session.SessionData>;
    }
  }
}

/**
 * POST /api/auth/register/public
 * Public user registration (no authentication required)
 */
router.post("/register/public", async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const { name, email, password, facility } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "必須項目が不足しています" });
    }

    // Check if email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "このメールアドレスは既に登録されています" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Insert user with default 'user' role
    await db.insert(users).values({
      id: userId,
      name,
      email,
      password: hashedPassword,
      role: "user",
      facility: facility || null,
      loginMethod: "password",
    });

    res.json({
      success: true,
      message: "ユーザーを登録しました",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "ユーザー登録に失敗しました" });
  }
});

/**
 * POST /api/auth/register
 * Register a new user (admin only)
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    // Check if user is authenticated and is admin
    if (!req.session.userId) {
      return res.status(401).json({ error: "認証が必要です" });
    }

    const currentUser = await db
      .select()
      .from(users)
      .where(eq(users.id, req.session.userId))
      .limit(1);

    if (currentUser.length === 0 || currentUser[0].role !== "admin") {
      return res.status(403).json({ error: "管理者権限が必要です" });
    }

    const { name, email, password, role, facility } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "必須項目が不足しています" });
    }

    // Check if email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "このメールアドレスは既に登録されています" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate user ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Insert user
    await db.insert(users).values({
      id: userId,
      name,
      email,
      password: hashedPassword,
      role,
      facility: facility || null,
      loginMethod: "password",
    });

    res.json({
      success: true,
      message: "ユーザーを登録しました",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "ユーザー登録に失敗しました" });
  }
});

/**
 * POST /api/auth/login
 * Login with email and password
 */
router.post("/login", async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "メールアドレスとパスワードを入力してください" });
    }

    // Find user by email
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (userResult.length === 0) {
      return res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません" });
    }

    const user = userResult[0];

    // Check if user has a password (password login method)
    if (!user.password) {
      return res.status(401).json({ error: "このアカウントはパスワードログインに対応していません" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません" });
    }

    // Update last signed in
    await db
      .update(users)
      .set({ lastSignedIn: new Date() })
      .where(eq(users.id, user.id));

    // Set session
    req.session.userId = user.id;

    // Save session explicitly
    req.session.save((err: any) => {      if (err) {
        console.error("Error saving session:", err);
        return res.status(500).json({ error: "セッションの保存に失敗しました" });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          facility: user.facility,
        },
      });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "ログインに失敗しました" });
  }
});

/**
 * POST /api/auth/logout
 * Logout current user
 */
router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err: any) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "ログアウトに失敗しました" });
    }
    res.json({ success: true, message: "ログアウトしました" });
  });
});

/**
 * GET /api/auth/me
 * Get current user info
 */
router.get("/me", async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "認証が必要です" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.id, req.session.userId))
      .limit(1);

    if (userResult.length === 0) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: "ユーザーが見つかりません" });
    }

    const user = userResult[0];

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      facility: user.facility,
    });
  } catch (error) {
    console.error("Error getting user info:", error);
    res.status(500).json({ error: "ユーザー情報の取得に失敗しました" });
  }
});

export default router;

