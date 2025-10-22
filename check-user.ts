import { getDb } from "../server/db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

async function checkUser() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const email = "mirainet2017@gmail.com";

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      console.log(`User not found: ${email}`);
    } else {
      const user = result[0];
      console.log("User information:");
      console.log(`- ID: ${user.id}`);
      console.log(`- Name: ${user.name}`);
      console.log(`- Email: ${user.email}`);
      console.log(`- Role: ${user.role}`);
      console.log(`- Facility: ${user.facility || "N/A"}`);
    }
  } catch (error) {
    console.error("Error checking user:", error);
    process.exit(1);
  }

  process.exit(0);
}

checkUser();

