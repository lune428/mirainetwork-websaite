import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Parse the path to determine which resource is being accessed
  const path = req.url || "";
  
  try {
    // Handle /api/admin/announcements
    if (path.includes("/announcements")) {
      return handleAnnouncements(req, res);
    }
    
    // Handle /api/admin/job-postings
    if (path.includes("/job-postings")) {
      return handleJobPostings(req, res);
    }

    return res.status(404).json({ error: "Not found" });
  } catch (error: any) {
    console.error("Admin API Error:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
}

async function handleAnnouncements(req: VercelRequest, res: VercelResponse) {
  // GET - Get all announcements
  if (req.method === "GET") {
    const result = await sql`
      SELECT * FROM announcements
      ORDER BY "createdAt" DESC
    `;
    return res.status(200).json(result.rows);
  }

  // POST - Create announcement
  if (req.method === "POST") {
    const { title, content, facility, isPublished, authorId, images } = req.body;

    if (!title || !content || !facility) {
      return res.status(400).json({ error: "必須項目が入力されていません" });
    }

    const imagesJson = images && images.length > 0 ? JSON.stringify(images) : null;

    const result = await sql`
      INSERT INTO announcements (
        title, content, facility, "isPublished", "authorId", images, "createdAt", "updatedAt"
      ) VALUES (
        ${title}, ${content}, ${facility}, ${isPublished || 'draft'}, ${authorId || 'admin'},
        ${imagesJson}, NOW(), NOW()
      )
      RETURNING *
    `;

    return res.status(201).json(result.rows[0]);
  }

  // PUT - Update announcement
  if (req.method === "PUT") {
    const { id, title, content, facility, isPublished, images } = req.body;

    if (!id) {
      return res.status(400).json({ error: "IDが指定されていません" });
    }

    const imagesJson = images && images.length > 0 ? JSON.stringify(images) : null;

    const result = await sql`
      UPDATE announcements
      SET title = ${title}, content = ${content}, facility = ${facility},
          "isPublished" = ${isPublished || 'draft'}, images = ${imagesJson}, "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "お知らせが見つかりません" });
    }

    return res.status(200).json(result.rows[0]);
  }

  // DELETE - Delete announcement
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "IDが指定されていません" });
    }

    await sql`DELETE FROM announcements WHERE id = ${id as string}`;
    return res.status(200).json({ message: "お知らせを削除しました" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

async function handleJobPostings(req: VercelRequest, res: VercelResponse) {
  // GET - Get all job postings
  if (req.method === "GET") {
    const result = await sql`
      SELECT * FROM "jobPostings"
      ORDER BY "createdAt" DESC
    `;
    return res.status(200).json(result.rows);
  }

  // POST - Create job posting
  if (req.method === "POST") {
    const {
      facility, title, employmentType, description, baseSalary,
      workingHours, holidays, insurance, contractPeriod, isPublished
    } = req.body;

    if (!facility || !title) {
      return res.status(400).json({ error: "必須項目が入力されていません" });
    }

    const result = await sql`
      INSERT INTO "jobPostings" (
        facility, title, "employmentType", description, "baseSalary",
        "workingHours", holidays, insurance, "contractPeriod", "isPublished",
        "createdAt", "updatedAt"
      ) VALUES (
        ${facility}, ${title}, ${employmentType || ''}, ${description || ''},
        ${baseSalary || ''}, ${workingHours || ''}, ${holidays || ''},
        ${insurance || ''}, ${contractPeriod || ''}, ${isPublished ? 1 : 0},
        NOW(), NOW()
      )
      RETURNING *
    `;

    return res.status(201).json(result.rows[0]);
  }

  // PUT - Update job posting
  if (req.method === "PUT") {
    const {
      id, facility, title, employmentType, description, baseSalary,
      workingHours, holidays, insurance, contractPeriod, isPublished
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "IDが指定されていません" });
    }

    const result = await sql`
      UPDATE "jobPostings"
      SET facility = ${facility}, title = ${title}, "employmentType" = ${employmentType || ''},
          description = ${description || ''}, "baseSalary" = ${baseSalary || ''},
          "workingHours" = ${workingHours || ''}, holidays = ${holidays || ''},
          insurance = ${insurance || ''}, "contractPeriod" = ${contractPeriod || ''},
          "isPublished" = ${isPublished ? 1 : 0}, "updatedAt" = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "求人情報が見つかりません" });
    }

    return res.status(200).json(result.rows[0]);
  }

  // DELETE - Delete job posting
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "IDが指定されていません" });
    }

    await sql`DELETE FROM "jobPostings" WHERE id = ${id as string}`;
    return res.status(200).json({ message: "求人情報を削除しました" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}

