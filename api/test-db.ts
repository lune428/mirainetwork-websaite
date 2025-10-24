import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../server/db";
import { announcements } from "../drizzle/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("[test-db] Starting database connection test...");
    
    // Get database instance
    const db = await getDb();
    
    if (!db) {
      console.error("[test-db] Failed to get database instance");
      return res.status(500).json({
        success: false,
        error: "Failed to connect to database",
        message: "DATABASE_URL may not be configured correctly"
      });
    }

    console.log("[test-db] Database instance obtained");

    // Test query: count announcements
    const result = await db.select().from(announcements);
    const count = result.length;

    console.log(`[test-db] Query successful. Found ${count} announcements`);

    return res.status(200).json({
      success: true,
      message: "Database connection test passed",
      announcements_count: count,
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

