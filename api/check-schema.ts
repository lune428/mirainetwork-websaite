import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Get announcements table schema
    const schema = await sql`
      SELECT column_name, data_type, character_maximum_length, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'announcements'
      ORDER BY ordinal_position
    `;

    // Try to select from announcements table
    const announcements = await sql`SELECT * FROM announcements LIMIT 5`;

    return res.json({
      success: true,
      schema: schema.rows,
      announcements: announcements.rows,
      count: announcements.rowCount
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}

