import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../server/db";
import { announcements, users, jobPostings } from "../drizzle/schema";
import { eq, count, sql } from "drizzle-orm";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mirai-network-jwt-secret-change-in-production"
);

async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  return cookieHeader.split(';').reduce((cookies, cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {} as Record<string, string>);
}

async function getUserFromRequest(req: VercelRequest) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.auth_token;
  if (!token) {
    console.error("No auth_token cookie found");
    return null;
  }

  const payload = await verifyToken(token);
  if (!payload) {
    return null;
  }

  const db = await getDb();
  if (!db) {
    return null;
  }

  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.id, payload.userId))
    .limit(1);

  if (userResult.length === 0) {
    return null;
  }

  return userResult[0];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "https://mirainetwork-websaite.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Check authentication
    const user = await getUserFromRequest(req);
    if (!user) {
      console.error("Authentication failed: No user found");
      console.error("Cookies:", req.cookies);
      return res.status(401).json({ error: "認証が必要です" });
    }
    console.log("User authenticated:", user.id, user.role);

    // Check if user is admin or facility admin
    const role = user.role;
    if (role !== "admin" && !role?.includes("_admin")) {
      return res.status(403).json({ error: "管理者権限が必要です" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "データベース接続エラー" });
    }

    const path = req.url?.split("?")[0] || "";
    
    // GET /api/admin/stats - Get dashboard stats
    if (req.method === "GET" && path.endsWith("/stats")) {
      const isAdmin = user.role === "admin";
      const userFacility = user.facility;

      let result;
      
      if (!isAdmin && userFacility) {
        result = await db.select({
          total: count(),
          pending: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'pending' THEN 1 ELSE 0 END)`,
          published: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'published' THEN 1 ELSE 0 END)`,
          draft: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'draft' THEN 1 ELSE 0 END)`,
        }).from(announcements).where(eq(announcements.facility, userFacility as any));
      } else {
        result = await db.select({
          total: count(),
          pending: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'pending' THEN 1 ELSE 0 END)`,
          published: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'published' THEN 1 ELSE 0 END)`,
          draft: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'draft' THEN 1 ELSE 0 END)`,
        }).from(announcements);
      }
      
      const stats = result[0];

      return res.json({
        totalAnnouncements: Number(stats.total) || 0,
        pendingApproval: Number(stats.pending) || 0,
        published: Number(stats.published) || 0,
        draft: Number(stats.draft) || 0,
      });
    }

    // GET /api/admin/job-postings - Get all job postings
    if (req.method === "GET" && path.includes("/job-postings")) {
      const posts = await db.select().from(jobPostings);
      return res.json(posts);
    }

    // Method or path not found
    return res.status(404).json({ error: "Not found" });
  } catch (error: any) {
    console.error("Error in admin API:", error);
    return res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
}

