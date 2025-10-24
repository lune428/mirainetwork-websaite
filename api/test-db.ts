import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("[test-db] Starting Vercel Postgres connection test...");
    
    // Test query
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
    
    console.log("[test-db] Query successful");

    return res.status(200).json({
      success: true,
      message: "Vercel Postgres connection test passed",
      current_time: result.rows[0]?.current_time,
      postgres_version: result.rows[0]?.pg_version,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("[test-db] Error:", error);
    
    return res.status(500).json({
      success: false,
      error: error.message || "Unknown error occurred",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}

