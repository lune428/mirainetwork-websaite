import mysql from "mysql2/promise";

async function checkAllTables() {
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

    console.log("Connected to database\n");

    // Get all tables
    const [tables] = await connection.execute("SHOW TABLES");
    
    console.log("All tables:");
    console.log(tables);
    console.log("\n");

    // Check each table structure
    for (const tableRow of tables as any[]) {
      const tableName = Object.values(tableRow)[0] as string;
      console.log(`\n=== Table: ${tableName} ===`);
      
      const [columns] = await connection.execute(`DESCRIBE ${tableName}`);
      console.table(columns);
    }

    await connection.end();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

checkAllTables();

