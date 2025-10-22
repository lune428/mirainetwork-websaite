import { getDb } from "../server/db";
import { users } from "../drizzle/schema";
import { nanoid } from "nanoid";

async function createTestUsers() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const testUsers = [
    {
      id: nanoid(),
      name: "MIRAI管理者",
      email: "mirai-admin@test.com",
      loginMethod: "test",
      role: "mirai_admin" as const,
      facility: "mirai" as const,
    },
    {
      id: nanoid(),
      name: "HIKARI管理者",
      email: "hikari-admin@test.com",
      loginMethod: "test",
      role: "hikari_admin" as const,
      facility: "hikari" as const,
    },
    {
      id: nanoid(),
      name: "studio M管理者",
      email: "studio-m-admin@test.com",
      loginMethod: "test",
      role: "studio_m_admin" as const,
      facility: "studio_m" as const,
    },
  ];

  try {
    for (const user of testUsers) {
      await db.insert(users).values(user);
      console.log(`Created user: ${user.name} (${user.email})`);
    }

    console.log("\nTest users created successfully!");
    console.log("\nLogin credentials:");
    console.log("- MIRAI管理者: mirai-admin@test.com");
    console.log("- HIKARI管理者: hikari-admin@test.com");
    console.log("- studio M管理者: studio-m-admin@test.com");
    console.log("\nNote: These are test accounts for development only.");
  } catch (error) {
    console.error("Error creating test users:", error);
    process.exit(1);
  }

  process.exit(0);
}

createTestUsers();

