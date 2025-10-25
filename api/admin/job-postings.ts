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

  try {
    // GET - Get all job postings (admin view)
    if (req.method === "GET") {
      const result = await sql`
        SELECT * FROM "jobPostings"
        ORDER BY "createdAt" DESC
      `;
      
      return res.status(200).json(result.rows);
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

      console.log("Creating job posting:", req.body);

      // Validate required fields
      if (!facility || !title) {
        return res.status(400).json({ error: "必須項目が入力されていません" });
      }

      // Insert job posting
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
        ) VALUES (
          ${facility},
          ${title},
          ${employmentType || ''},
          ${description || ''},
          ${baseSalary || ''},
          ${workingHours || ''},
          ${holidays || ''},
          ${insurance || ''},
          ${contractPeriod || ''},
          ${isPublished ? 1 : 0},
          NOW(),
          NOW()
        )
        RETURNING *
      `;

      console.log("Job posting created:", result.rows[0]);
      return res.status(201).json(result.rows[0]);
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

      console.log("Updating job posting:", id, req.body);

      if (!id) {
        return res.status(400).json({ error: "IDが指定されていません" });
      }

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
          "isPublished" = ${isPublished ? 1 : 0},
          "updatedAt" = NOW()
        WHERE id = ${id}
        RETURNING *
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "求人情報が見つかりません" });
      }

      console.log("Job posting updated:", result.rows[0]);
      return res.status(200).json(result.rows[0]);
    }

    // DELETE - Delete job posting
    if (req.method === "DELETE") {
      const { id } = req.query;

      console.log("Deleting job posting:", id);

      if (!id) {
        return res.status(400).json({ error: "IDが指定されていません" });
      }

      await sql`
        DELETE FROM "jobPostings"
        WHERE id = ${id as string}
      `;

      console.log("Job posting deleted:", id);
      return res.status(200).json({ message: "求人情報を削除しました" });
    }

    return res.status(405).json({ error: "Method not allowed" });

  } catch (error: any) {
    console.error("Admin Job Postings API Error:", error);
    return res.status(500).json({
      error: "求人情報の処理に失敗しました",
      details: error.message
    });
  }
}

