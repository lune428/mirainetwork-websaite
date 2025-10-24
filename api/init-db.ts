import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("[init-db] Starting database initialization...");
    
    // Drop existing tables to recreate with correct schema
    await sql`DROP TABLE IF EXISTS announcements CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log("[init-db] Dropped existing tables");
    
    // Create users table matching schema.ts
    await sql`
      CREATE TABLE users (
        id VARCHAR(64) PRIMARY KEY,
        name TEXT,
        email VARCHAR(320),
        password VARCHAR(255),
        "loginMethod" VARCHAR(64),
        role VARCHAR(64) DEFAULT 'user',
        facility VARCHAR(64),
        "lastSignedIn" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log("[init-db] Users table created successfully");

    // Create admin user
    const adminEmail = 'admin@mirainetwork.jp';
    const adminPassword = 'mirai2024';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await sql`
      INSERT INTO users (id, name, email, password, role, facility, "loginMethod")
      VALUES ('admin_001', '管理者', ${adminEmail}, ${hashedPassword}, 'admin', 'corporate', 'password')
    `;
    
    console.log("[init-db] Admin user created successfully");

    // Create announcements table matching schema.ts
    await sql`
      CREATE TABLE announcements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        facility VARCHAR(64) NOT NULL,
        "isPublished" VARCHAR(64) DEFAULT 'draft',
        "authorId" VARCHAR(64) NOT NULL,
        images TEXT,
        "publishedAt" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    
    console.log("[init-db] Announcements table created successfully");

    // Get table info
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    return res.status(200).json({
      success: true,
      message: "Database initialized successfully",
      tables: tables.rows.map(r => r.table_name),
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

