import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("=== Debug Create Announcement ===");
    console.log("Environment variables:");
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
    console.log("POSTGRES_URL:", process.env.POSTGRES_URL ? "SET" : "NOT SET");

    // Test database connection
    console.log("\n1. Testing database connection...");
    const testResult = await sql`SELECT NOW() as current_time`;
    console.log("Database connection successful:", testResult.rows[0]);

    // Check announcements table
    console.log("\n2. Checking announcements table...");
    const tableCheck = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'announcements'
      ORDER BY ordinal_position
    `;
    console.log("Table columns:", tableCheck.rows);

    // Try to insert a test announcement
    console.log("\n3. Attempting to insert test announcement...");
    const insertResult = await sql`
      INSERT INTO announcements (
        title, content, facility, "isPublished", "authorId", "createdAt", "updatedAt"
      )
      VALUES (
        'デバッグテスト', 
        'これはデバッグ用のテストです', 
        'corporate', 
        'draft', 
        'admin_001',
        NOW(),
        NOW()
      )
      RETURNING *
    `;
    console.log("Insert successful:", insertResult.rows[0]);

    return res.json({
      success: true,
      message: "デバッグテスト成功",
      data: {
        databaseConnection: "OK",
        tableColumns: tableCheck.rows,
        insertedAnnouncement: insertResult.rows[0]
      }
    });

  } catch (error: any) {
    console.error("=== Debug Error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error details:", JSON.stringify(error, null, 2));

    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      details: error
    });
  }
}

