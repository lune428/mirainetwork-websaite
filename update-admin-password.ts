import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

async function updatePassword() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    // Parse MySQL URL
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

    // Hash new password
    const newPassword = "hiiro0428";
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log("New password hashed");

    // Update password for admin user
    const [result] = await connection.execute(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, "mirainet2017@gmail.com"]
    );

    console.log("Password update result:", result);
    console.log("✅ Password updated successfully for mirainet2017@gmail.com");
    console.log("New password: hiiro0428");

    await connection.end();
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}

updatePassword();

