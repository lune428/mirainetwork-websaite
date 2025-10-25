import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Test direct SQL insert
    const result = await sql`
      INSERT INTO announcements (title, content, facility, "isPublished", "authorId")
      VALUES ('テストお知らせ', 'これはテストです', 'corporate', 'draft', 'admin_001')
      RETURNING *
    `;

    return res.json({
      success: true,
      message: "Insert successful",
      data: result.rows[0]
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      detail: error.detail
    });
  }
}

