import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("[init-db] Starting database initialization...");
    
    // Create announcements table
    await sql`
      CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        facility TEXT NOT NULL,
        is_published BOOLEAN DEFAULT FALSE NOT NULL,
        is_approved BOOLEAN DEFAULT FALSE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        published_at TIMESTAMP,
        approved_at TIMESTAMP,
        approved_by TEXT
      )
    `;
    
    console.log("[init-db] Announcements table created successfully");

    // Insert sample data
    await sql`
      INSERT INTO announcements (title, content, facility, is_published, is_approved)
      VALUES ('テストお知らせ', 'これはテストのお知らせです。', 'MIRAI', true, true)
      ON CONFLICT DO NOTHING
    `;
    
    console.log("[init-db] Sample data inserted");

    // Get table info
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    return res.status(200).json({
      success: true,
      message: "Database initialized successfully",
      tables: tables.rows,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("[init-db] Error:", error);
    
    return res.status(500).json({
      success: false,
      error: error.message || "Unknown error occurred",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}

