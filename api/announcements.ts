import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
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
  try {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.auth_token;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload) return null;

    const result = await sql`
      SELECT * FROM users WHERE id = ${payload.userId} LIMIT 1
    `;

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error getting user from request:", error);
    return null;
  }
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
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const path = url.pathname;

    // GET /api/announcements - Get all announcements (public)
    if (req.method === "GET" && !path.includes("/admin")) {
      const facility = url.searchParams.get("facility");
      
      let query;
      if (facility && facility !== "all") {
        query = sql`
          SELECT * FROM announcements 
          WHERE "isPublished" = 'published' AND facility = ${facility}
          ORDER BY "publishedAt" DESC
        `;
      } else {
        query = sql`
          SELECT * FROM announcements 
          WHERE "isPublished" = 'published'
          ORDER BY "publishedAt" DESC
        `;
      }

      const result = await query;
      return res.json({ announcements: result.rows });
    }

    // All admin routes require authentication
    const user = await getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "認証が必要です" });
    }

    const role = user.role;
    if (role !== "admin" && !role?.includes("_admin")) {
      return res.status(403).json({ error: "管理者権限が必要です" });
    }

    // GET /api/announcements/admin - Get all announcements for admin
    if (req.method === "GET" && path.includes("/admin")) {
      const isAdmin = user.role === "admin";
      const userFacility = user.facility;

      let query;
      if (isAdmin) {
        query = sql`
          SELECT a.*, u.name as "authorName"
          FROM announcements a
          LEFT JOIN users u ON a."authorId" = u.id
          ORDER BY a."createdAt" DESC
        `;
      } else {
        query = sql`
          SELECT a.*, u.name as "authorName"
          FROM announcements a
          LEFT JOIN users u ON a."authorId" = u.id
          WHERE a.facility = ${userFacility}
          ORDER BY a."createdAt" DESC
        `;
      }

      const result = await query;
      return res.json({ announcements: result.rows });
    }

    // POST /api/announcements/admin - Create new announcement
    if (req.method === "POST" && path.includes("/admin")) {
      const { title, content, facility, isPublished, images } = req.body;

      if (!title || !content || !facility) {
        return res.status(400).json({ error: "必須項目が不足しています" });
      }

      const isAdmin = user.role === "admin";
      const userFacility = user.facility;

      if (!isAdmin && facility !== userFacility) {
        return res.status(403).json({ error: "他の事業所のお知らせを作成する権限がありません" });
      }

      const imagesJson = images && Array.isArray(images) && images.length > 0 
        ? JSON.stringify(images) 
        : null;

      const publishedAt = isPublished === "published" ? new Date().toISOString() : null;
      const status = isPublished || "draft";

      const result = await sql`
        INSERT INTO announcements (
          title, content, facility, "isPublished", "authorId", images, "publishedAt", "createdAt", "updatedAt"
        )
        VALUES (
          ${title}, ${content}, ${facility}, ${status}, ${user.id}, ${imagesJson}, ${publishedAt}, NOW(), NOW()
        )
        RETURNING *
      `;

      return res.json({ 
        message: "お知らせを作成しました", 
        announcement: result.rows[0] 
      });
    }

    // PUT /api/announcements/admin/:id - Update announcement
    if (req.method === "PUT" && path.includes("/admin/")) {
      const id = path.split("/").pop();
      const { title, content, facility, isPublished, images } = req.body;

      if (!title || !content || !facility) {
        return res.status(400).json({ error: "必須項目が不足しています" });
      }

      const imagesJson = images && Array.isArray(images) && images.length > 0 
        ? JSON.stringify(images) 
        : null;

      const publishedAt = isPublished === "published" ? new Date().toISOString() : null;

      const result = await sql`
        UPDATE announcements
        SET 
          title = ${title},
          content = ${content},
          facility = ${facility},
          "isPublished" = ${isPublished},
          images = ${imagesJson},
          "publishedAt" = ${publishedAt},
          "updatedAt" = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "お知らせが見つかりません" });
      }

      return res.json({ 
        message: "お知らせを更新しました", 
        announcement: result.rows[0] 
      });
    }

    // DELETE /api/announcements/admin/:id - Delete announcement
    if (req.method === "DELETE" && path.includes("/admin/")) {
      const id = path.split("/").pop();

      const result = await sql`
        DELETE FROM announcements
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "お知らせが見つかりません" });
      }

      return res.json({ message: "お知らせを削除しました" });
    }

    return res.status(404).json({ error: "エンドポイントが見つかりません" });

  } catch (error: any) {
    console.error("Error in announcements API:", error);
    return res.status(500).json({ 
      error: "サーバーエラーが発生しました",
      details: error.message,
      stack: error.stack
    });
  }
}

