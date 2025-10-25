// Job Postings Admin API - Handles CRUD operations for job postings
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

    console.log("Request:", req.method, req.url, "User:", user.id, "Role:", user.role);

    // GET /api/admin/jobpostings - Get all job postings for admin
    if (req.method === "GET") {
      const isAdmin = user.role === "admin";
      const userFacility = user.facility;

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

    // POST /api/admin/jobpostings - Create new job posting
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

      const isAdmin = user.role === "admin";
      const userFacility = user.facility;

      if (!isAdmin && facility !== userFacility) {
        return res.status(403).json({ error: "他の事業所の求人情報を作成する権限がありません" });
      }

      const publishedValue = isPublished === "published" || isPublished === true ? 1 : 0;

      console.log("Inserting into database:", { facility, title, publishedValue });

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

      console.log("Insert successful:", result.rows[0].id);

      return res.json({ 
        message: "求人情報を作成しました", 
        jobPosting: result.rows[0] 
      });
    }

    // PUT /api/admin/jobpostings - Update job posting
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

      console.log("Update successful");

      return res.json({ 
        message: "求人情報を更新しました", 
        jobPosting: result.rows[0] 
      });
    }

    // DELETE /api/admin/jobpostings - Delete job posting
    if (req.method === "DELETE") {
      const { id } = req.query;

      console.log("Deleting job posting:", id);

      if (!id) {
        return res.status(400).json({ error: "IDが指定されていません" });
      }

      const result = await sql`
        DELETE FROM "jobPostings"
        WHERE id = ${id as string}
        RETURNING *
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "求人情報が見つかりません" });
      }

      console.log("Delete successful");

      return res.json({ message: "求人情報を削除しました" });
    }

    return res.status(404).json({ error: "エンドポイントが見つかりません" });

  } catch (error: any) {
    console.error("Error in admin job postings API:", error);
    console.error("Error stack:", error.stack);
    
    return res.status(500).json({ 
      error: "サーバーエラーが発生しました",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}

