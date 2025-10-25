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
    // Check authentication
    const user = await getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: "認証が必要です" });
    }

    const role = user.role;
    if (role !== "admin" && !role?.includes("_admin")) {
      return res.status(403).json({ error: "管理者権限が必要です" });
    }

    const url = new URL(req.url!, `http://${req.headers.host}`);
    const path = url.pathname;
    const pathParts = path.split("/").filter(Boolean);
    const announcementId = pathParts[pathParts.length - 1];

    console.log("Request:", req.method, path, "User:", user.id, "Role:", user.role);

    // GET /api/admin/announcements - Get all announcements for admin
    if (req.method === "GET" && !path.match(/\/\d+$/)) {
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
      console.log(`Found ${result.rows.length} announcements`);
      return res.json(result.rows);
    }

    // GET /api/admin/announcements/:id - Get single announcement
    if (req.method === "GET" && path.match(/\/\d+$/)) {
      const result = await sql`
        SELECT a.*, u.name as "authorName"
        FROM announcements a
        LEFT JOIN users u ON a."authorId" = u.id
        WHERE a.id = ${announcementId}
        LIMIT 1
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "お知らせが見つかりません" });
      }

      return res.json(result.rows[0]);
    }

    // POST /api/admin/announcements - Create new announcement
    if (req.method === "POST" && !path.match(/\/\d+/)) {
      const { title, content, facility, isPublished, images } = req.body;

      console.log("Creating announcement:", { title, content, facility, isPublished, images: images?.length });

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

      console.log("Inserting into database:", { title, facility, status, imagesJson });

      const result = await sql`
        INSERT INTO announcements (
          title, content, facility, "isPublished", "authorId", images, "publishedAt", "createdAt", "updatedAt"
        )
        VALUES (
          ${title}, ${content}, ${facility}, ${status}, ${user.id}, ${imagesJson}, ${publishedAt}, NOW(), NOW()
        )
        RETURNING *
      `;

      console.log("Insert successful:", result.rows[0].id);

      return res.json({ 
        message: "お知らせを作成しました", 
        announcement: result.rows[0] 
      });
    }

    // PUT /api/admin/announcements/:id - Update announcement
    if (req.method === "PUT" && path.match(/\/\d+$/)) {
      const { title, content, facility, isPublished, images } = req.body;

      console.log("Updating announcement:", announcementId, { title, facility, isPublished });

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
        WHERE id = ${announcementId}
        RETURNING *
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "お知らせが見つかりません" });
      }

      console.log("Update successful");

      return res.json({ 
        message: "お知らせを更新しました", 
        announcement: result.rows[0] 
      });
    }

    // DELETE /api/admin/announcements/:id - Delete announcement
    if (req.method === "DELETE" && path.match(/\/\d+$/)) {
      console.log("Deleting announcement:", announcementId);

      const result = await sql`
        DELETE FROM announcements
        WHERE id = ${announcementId}
        RETURNING *
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "お知らせが見つかりません" });
      }

      console.log("Delete successful");

      return res.json({ message: "お知らせを削除しました" });
    }

    return res.status(404).json({ error: "エンドポイントが見つかりません" });

  } catch (error: any) {
    console.error("Error in admin announcements API:", error);
    console.error("Error stack:", error.stack);
    
    return res.status(500).json({ 
      error: "サーバーエラーが発生しました",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}

