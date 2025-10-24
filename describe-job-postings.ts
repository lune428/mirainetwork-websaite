import { getDb } from "./server/db";

async function describeTable() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database connection failed");
      return;
    }

    console.log("Describing jobPostings table...");
    const result = await db.execute("DESCRIBE jobPostings");
    console.log("Columns:", JSON.stringify(result[0], null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
  process.exit(0);
}

describeTable();

