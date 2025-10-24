import mysql from "mysql2/promise";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";

let _db: MySql2Database<Record<string, never>> | null = null;

/**
 * Parse DATABASE_URL and create connection config
 */
function parseDatabaseUrl(url: string) {
  // Remove mysql:// prefix
  const withoutProtocol = url.replace('mysql://', '');
  
  // Split into auth and host parts
  const [authPart, hostPart] = withoutProtocol.split('@');
  const [user, password] = authPart.split(':');
  
  // Split host part
  const [hostAndPort, database] = hostPart.split('/');
  const [host, port] = hostAndPort.split(':');
  
  return {
    host,
    port: parseInt(port || '3306'),
    user,
    password,
    database,
  };
}

/**
 * Get database instance
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
    console.log("[Database] Parsing DATABASE_URL...");
    const config = parseDatabaseUrl(databaseUrl);
    
    console.log("[Database] Creating connection pool...");
    const pool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });

    // Test the connection
    console.log("[Database] Testing connection...");
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log("[Database] Connection test successful");

    // Create Drizzle instance
    _db = drizzle(pool);
    console.log("[Database] Drizzle ORM initialized successfully");
    
    return _db;
  } catch (error) {
    console.error("[Database] Failed to connect:", error);
    _db = null;
    return null;
  }
}

