import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { users, announcements } from "./drizzle/schema";

async function testConnection() {
  try {
    console.log("1. Testing database connection...");
    
    const DATABASE_URL = process.env.DATABASE_URL;
    console.log("DATABASE_URL exists:", !!DATABASE_URL);
    if (!DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    
    console.log("2. Creating mysql2 connection...");
    const connection = await mysql.createConnection(DATABASE_URL);
    console.log("✅ MySQL connection created successfully");
    
    console.log("3. Creating drizzle instance...");
    const db = drizzle(connection);
    console.log("✅ Drizzle instance created successfully");
    
    console.log("4. Testing query: SELECT users...");
    const usersList = await db.select().from(users).limit(1);
    console.log("✅ Users query successful:", usersList.length, "users found");
    
    console.log("5. Testing query: SELECT announcements...");
    const announcementsList = await db.select().from(announcements).limit(1);
    console.log("✅ Announcements query successful:", announcementsList.length, "announcements found");
    
    console.log("\n✅ ALL TESTS PASSED - Database connection is working!");
    
    await connection.end();
  } catch (error: any) {
    console.error("\n❌ TEST FAILED:");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
}

testConnection();
