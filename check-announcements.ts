import mysql from "mysql2/promise";

async function checkTable() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    const url = new URL(dbUrl);
    
    const connection = await mysql.createConnection({
      host: url.hostname,
      port: parseInt(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1),
      ssl: {
        rejectUnauthorized: true,
      },
    });

    console.log("Connected to database");

    // Check if announcements table exists
    const [tables] = await connection.execute(
      "SHOW TABLES LIKE 'announcements'"
    );

    console.log("Announcements table exists:", tables);

    if (Array.isArray(tables) && tables.length > 0) {
      // Get table structure
      const [columns] = await connection.execute(
        "DESCRIBE announcements"
      );
      console.log("\nTable structure:");
      console.log(columns);
    } else {
      console.log("❌ announcements table does not exist");
    }

    await connection.end();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

checkTable();

