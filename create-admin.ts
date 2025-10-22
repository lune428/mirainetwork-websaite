import { getDb } from "../server/db";
import { users } from "../drizzle/schema";

async function createInitialAdmin() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("Database connection failed");
      process.exit(1);
    }

    const hashedPassword = "$2b$10$2blHW54k2sRX8Hc3Wbki.uZqRocu6I8s8bgyQPHwQ00A/o04S9dMO";
    const userId = `admin_${Date.now()}`;

    await db.insert(users).values({
      id: userId,
      name: "管理者",
      email: "mirainet2017@gmail.com",
      password: hashedPassword,
      role: "admin",
      facility: "corporate",
      loginMethod: "password",
    });

    console.log("✓ Initial admin user created successfully!");
    console.log("  Email: mirainet2017@gmail.com");
    console.log("  Password: hiiro0428");
    console.log("\nYou can now login at: /login");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

createInitialAdmin();

