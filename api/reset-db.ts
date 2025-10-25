import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("[reset-db] Starting complete database reset...");
    
    // Drop ALL tables
    await sql`DROP TABLE IF EXISTS contact_submissions CASCADE`;
    await sql`DROP TABLE IF EXISTS benefits CASCADE`;
    await sql`DROP TABLE IF EXISTS "jobPostings" CASCADE`;
    await sql`DROP TABLE IF EXISTS announcements CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    console.log("[reset-db] All tables dropped");
    
    // Create users table with correct schema (matching schema.ts)
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
    console.log("[reset-db] Users table created");

    // Create admin user
    const adminEmail = 'admin@mirainetwork.jp';
    const adminPassword = 'mirai2024';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    await sql`
      INSERT INTO users (id, name, email, password, role, facility, "loginMethod")
      VALUES ('admin_001', '管理者', ${adminEmail}, ${hashedPassword}, 'admin', 'corporate', 'password')
    `;
    console.log("[reset-db] Admin user created");

    // Create announcements table with correct schema (matching schema.ts)
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
    console.log("[reset-db] Announcements table created");

    // Create jobPostings table (matching schema.ts)
    await sql`
      CREATE TABLE "jobPostings" (
        id SERIAL PRIMARY KEY,
        facility VARCHAR(64) NOT NULL,
        title VARCHAR(255) NOT NULL,
        "employmentType" VARCHAR(100) NOT NULL,
        "jobDescription" TEXT NOT NULL,
        "baseSalary" TEXT NOT NULL,
        "workSchedule" TEXT NOT NULL,
        holidays TEXT NOT NULL,
        "socialInsurance" TEXT NOT NULL,
        "contractPeriod" TEXT NOT NULL,
        "isPublished" INTEGER DEFAULT 0,
        "createdBy" VARCHAR(64) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log("[reset-db] Job postings table created");

    // Create benefits table (matching schema.ts)
    await sql`
      CREATE TABLE benefits (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(64) NOT NULL,
        "displayOrder" INTEGER DEFAULT 0 NOT NULL,
        "isPublished" INTEGER DEFAULT 1 NOT NULL,
        "createdBy" VARCHAR(64) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log("[reset-db] Benefits table created");

    // Create contact_submissions table (matching schema.ts)
    await sql`
      CREATE TABLE contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        facility VARCHAR(64) DEFAULT 'corporate',
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(64) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log("[reset-db] Contact submissions table created");

    // Get all tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    return res.status(200).json({
      success: true,
      message: "Database reset successfully with correct schema",
      tables: tables.rows.map((r: any) => r.table_name),
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error("[reset-db] Error:", error);
    
    return res.status(500).json({
      success: false,
      error: error.message || "Unknown error occurred",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
}

