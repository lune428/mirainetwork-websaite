import { getDb } from "./server/db";
import { announcements } from "./drizzle/schema";
import { count, sql } from "drizzle-orm";

async function testQuery() {
  try {
    const db = await getDb();
    if (!db) {
      throw new Error("Database connection failed");
    }

    console.log("Testing announcements query...\n");

    // Test simple select
    console.log("1. Simple select:");
    const allAnnouncements = await db.select().from(announcements);
    console.log("Total announcements:", allAnnouncements.length);
    console.log("Sample:", allAnnouncements[0]);

    // Test stats query (same as in api/admin.ts)
    console.log("\n2. Stats query:");
    const result = await db.select({
      total: count(),
      pending: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'pending' THEN 1 ELSE 0 END)`,
      published: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'published' THEN 1 ELSE 0 END)`,
      draft: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'draft' THEN 1 ELSE 0 END)`,
    }).from(announcements);

    console.log("Stats result:", result[0]);

    console.log("\n✅ Query test successful!");
  } catch (error) {
    console.error("❌ Query test failed:");
    console.error(error);
  }
}

testQuery();

