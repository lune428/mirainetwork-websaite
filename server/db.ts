import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import type { VercelPgDatabase } from "drizzle-orm/vercel-postgres";

let _db: VercelPgDatabase<Record<string, never>> | null = null;

/**
 * Get database instance
 * Uses Vercel Postgres for serverless compatibility
 */
export async function getDb(): Promise<VercelPgDatabase<Record<string, never>> | null> {
  if (_db) {
    return _db;
  }

  try {
    // Create Drizzle instance with Vercel Postgres
    _db = drizzle(sql);
    console.log("[Database] Vercel Postgres initialized successfully");
    
    return _db;
  } catch (error) {
    console.error("[Database] Failed to initialize:", error);
    _db = null;
    return null;
  }
}

