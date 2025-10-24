import mysql from "mysql2/promise";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";

let _db: MySql2Database<Record<string, never>> | null = null;
let _pool: mysql.Pool | null = null;

/**
 * Get database instance
 * Creates a connection pool if it doesn't exist
 */
export async function getDb(): Promise<MySql2Database<Record<string, never>> | null> {
  if (_db) {
    return _db;
  }

  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error("[Database] DATABASE_URL environment variable is not set");
    return null;
  }

  try {
    // Create connection pool if it doesn't exist
    if (!_pool) {
      _pool = mysql.createPool({
        uri: databaseUrl,
        waitForConnections: true,
        connectionLimit: 1,
        queueLimit: 0,
      });
      
      // Test the connection
      const connection = await _pool.getConnection();
      await connection.ping();
      connection.release();
      
      console.log("[Database] Connection pool created successfully");
    }

    // Create Drizzle instance
    _db = drizzle(_pool);
    console.log("[Database] Drizzle ORM initialized successfully");
    
    return _db;
  } catch (error) {
    console.error("[Database] Failed to connect:", error);
    _db = null;
    _pool = null;
    return null;
  }
}

/**
 * Close database connection
 */
export async function closeDb(): Promise<void> {
  if (_pool) {
    await _pool.end();
    _pool = null;
    _db = null;
    console.log("[Database] Connection pool closed");
  }
}

