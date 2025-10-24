import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkDbStructure() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);

  try {
    console.log("Checking users table structure...\n");
    
    const [columns] = await connection.query(
      "DESCRIBE users"
    );
    
    console.log("Users table columns:");
    console.log(columns);
    
    console.log("\n\nChecking if admin user exists...\n");
    
    const [users] = await connection.query(
      "SELECT id, name, email, role, facility, created_at FROM users WHERE email = ?",
      ["mirainet2017@gmail.com"]
    );
    
    console.log("Admin user:");
    console.log(users);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

checkDbStructure();

