import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

async function verifyPassword() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);

  try {
    const email = "mirainet2017@gmail.com";
    const testPassword = "mirai2017";
    
    console.log(`Testing login for: ${email}`);
    console.log(`Test password: ${testPassword}\n`);
    
    const [users] = await connection.query(
      "SELECT id, name, email, password, role, facility FROM users WHERE email = ?",
      [email]
    ) as any;
    
    if (users.length === 0) {
      console.log("User not found!");
      return;
    }
    
    const user = users[0];
    console.log("User found:");
    console.log(`- Email: ${user.email}`);
    console.log(`- Password hash: ${user.password}\n`);
    
    const isValid = await bcrypt.compare(testPassword, user.password);
    
    console.log(`Password verification result: ${isValid ? 'SUCCESS ✓' : 'FAILED ✗'}`);
    
    if (!isValid) {
      console.log("\nThe password does not match. Creating a new hash for 'mirai2017'...");
      const newHash = await bcrypt.hash(testPassword, 10);
      console.log(`New hash: ${newHash}`);
      
      console.log("\nWould you like to update the password? (This script doesn't update automatically)");
    }
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

verifyPassword();

