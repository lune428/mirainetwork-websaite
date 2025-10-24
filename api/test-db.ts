import type { VercelRequest, VercelResponse } from "@vercel/node";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { announcements } from "../drizzle/schema";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("[TEST] Starting database connection test...");
    
    if (!process.env.DATABASE_URL) {
      console.error("[TEST] DATABASE_URL is not set");
      return res.status(500).json({ 
        error: "DATABASE_URL is not set",
        env_keys: Object.keys(process.env).filter(k => k.includes('DATABASE'))
      });
    }
    
    console.log("[TEST] DATABASE_URL exists");
    
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("[TEST] MySQL connection created");
    
    const db = drizzle(connection);
    console.log("[TEST] Drizzle instance created");
    
    const result = await db.select().from(announcements).limit(1);
    console.log("[TEST] Query successful, found:", result.length, "announcements");
    
    await connection.end();
    
    return res.json({ 
      success: true, 
      message: "Database connection test passed",
      announcements_count: result.length
    });
  } catch (error: any) {
    console.error("[TEST] Error:", error.message);
    console.error("[TEST] Stack:", error.stack);
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
}
