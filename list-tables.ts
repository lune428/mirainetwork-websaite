import { getDb } from "./server/db";

async function listTables() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database connection failed");
      return;
    }

    console.log("Listing all tables...");
    const result = await db.execute("SHOW TABLES");
    console.log("Tables:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
  process.exit(0);
}

listTables();

