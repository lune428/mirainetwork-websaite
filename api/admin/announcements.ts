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
    const resourceId = pathParts[pathParts.length - 1];
    
    // Check if this is a job postings request
    const type = url.searchParams.get('type');
    const isJobsRequest = type === 'jobs';

    console.log("Request:", req.method, path, "Type:", type, "User:", user.id, "Role:", user.role);

    // ========== JOB POSTINGS ENDPOINTS ==========
    if (isJobsRequest) {
      const isAdmin = user.role === "admin";
      const userFacility = user.facility;

      // GET - Get all job postings
      if (req.method === "GET") {
        let query;
        if (isAdmin) {
          query = sql`
            SELECT *
            FROM "jobPostings"
            ORDER BY "createdAt" DESC
          `;
        } else {
          query = sql`
            SELECT *
            FROM "jobPostings"
            WHERE facility = ${userFacility}
            ORDER BY "createdAt" DESC
          `;
        }

        const result = await query;
        console.log(`Found ${result.rows.length} job postings`);
        return res.json(result.rows);
      }

      // POST - Create new job posting
      if (req.method === "POST") {
        const {
          facility,
          title,
          employmentType,
          description,
          baseSalary,
          workingHours,
          holidays,
          insurance,
          contractPeriod,
          isPublished
        } = req.body;

        console.log("Creating job posting:", { facility, title, employmentType, isPublished });

        if (!facility || !title) {
          return res.status(400).json({ error: "必須項目が不足しています" });
        }

        if (!isAdmin && facility !== userFacility) {
          return res.status(403).json({ error: "他の事業所の求人情報を作成する権限がありません" });
        }

        const publishedValue = isPublished === "published" || isPublished === true ? 1 : 0;

        const result = await sql`
          INSERT INTO "jobPostings" (
            facility,
            title,
            "employmentType",
            description,
            "baseSalary",
            "workingHours",
            holidays,
            insurance,
            "contractPeriod",
            "isPublished",
            "createdAt",
            "updatedAt"
          )
          VALUES (
            ${facility},
            ${title},
            ${employmentType || ''},
            ${description || ''},
            ${baseSalary || ''},
            ${workingHours || ''},
            ${holidays || ''},
            ${insurance || ''},
            ${contractPeriod || ''},
            ${publishedValue},
            NOW(),
            NOW()
          )
          RETURNING *
        `;

        console.log("Job posting created:", result.rows[0].id);

        return res.json({ 
          message: "求人情報を作成しました", 
          jobPosting: result.rows[0] 
        });
      }

      // PUT - Update job posting
      if (req.method === "PUT") {
        const {
          id,
          facility,
          title,
          employmentType,
          description,
          baseSalary,
          workingHours,
          holidays,
          insurance,
          contractPeriod,
          isPublished
        } = req.body;

        console.log("Updating job posting:", id, { facility, title, isPublished });

        if (!id) {
          return res.status(400).json({ error: "IDが指定されていません" });
        }

        if (!facility || !title) {
          return res.status(400).json({ error: "必須項目が不足しています" });
        }

        const publishedValue = isPublished === "published" || isPublished === true ? 1 : 0;

        const result = await sql`
          UPDATE "jobPostings"
          SET 
            facility = ${facility},
            title = ${title},
            "employmentType" = ${employmentType || ''},
            description = ${description || ''},
            "baseSalary" = ${baseSalary || ''},
            "workingHours" = ${workingHours || ''},
            holidays = ${holidays || ''},
            insurance = ${insurance || ''},
            "contractPeriod" = ${contractPeriod || ''},
            "isPublished" = ${publishedValue},
            "updatedAt" = NOW()
          WHERE id = ${id}
          RETURNING *
        `;

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "求人情報が見つかりません" });
        }

        console.log("Job posting updated");

        return res.json({ 
          message: "求人情報を更新しました", 
          jobPosting: result.rows[0] 
        });
      }

      // DELETE - Delete job posting
      if (req.method === "DELETE") {
        const id = url.searchParams.get('id');

        console.log("Deleting job posting:", id);

        if (!id) {
          return res.status(400).json({ error: "IDが指定されていません" });
        }

        const result = await sql`
          DELETE FROM "jobPostings"
          WHERE id = ${id}
          RETURNING *
        `;

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "求人情報が見つかりません" });
        }

        console.log("Job posting deleted");

        return res.json({ message: "求人情報を削除しました" });
      }

      return res.status(405).json({ error: "Method not allowed" });
    }

    // ========== ANNOUNCEMENTS ENDPOINTS (ORIGINAL) ==========
    
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
        WHERE a.id = ${resourceId}
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

      console.log("Updating announcement:", resourceId, { title, facility, isPublished });

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
        WHERE id = ${resourceId}
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
      console.log("Deleting announcement:", resourceId);

      const result = await sql`
        DELETE FROM announcements
        WHERE id = ${resourceId}
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
    console.error("Error in admin API:", error);
    console.error("Error stack:", error.stack);
    
    return res.status(500).json({ 
      error: "サーバーエラーが発生しました",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}

