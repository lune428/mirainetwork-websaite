import { getDb } from "./server/db";
import { jobPostings } from "./drizzle/schema";

async function testApi() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database connection failed");
      return;
    }

    console.log("Testing job postings API...");
    const posts = await db.select().from(jobPostings);
    console.log("Job postings:", JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
  process.exit(0);
}

testApi();

