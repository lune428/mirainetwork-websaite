import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

async function updatePassword() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);

  try {
    const email = "mirainet2017@gmail.com";
    const newPassword = "mirai2017";
    
    console.log(`Updating password for: ${email}`);
    console.log(`New password: ${newPassword}`);
    console.log(`Using bcryptjs (same as the login API)\n`);
    
    // Generate new hash using bcryptjs
    const newHash = await bcrypt.hash(newPassword, 10);
    console.log(`Generated hash: ${newHash}\n`);
    
    // Update password in database
    const [result] = await connection.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [newHash, email]
    ) as any;
    
    console.log(`Update result: ${result.affectedRows} row(s) updated\n`);
    
    // Verify the update
    const [users] = await connection.query(
      "SELECT email, password FROM users WHERE email = ?",
      [email]
    ) as any;
    
    if (users.length > 0) {
      const user = users[0];
      console.log("Verifying updated password...");
      const isValid = await bcrypt.compare(newPassword, user.password);
      console.log(`Verification result: ${isValid ? 'SUCCESS ✓' : 'FAILED ✗'}`);
      
      if (isValid) {
        console.log("\n✓ Password has been successfully updated!");
        console.log("You can now log in with:");
        console.log(`  Email: ${email}`);
        console.log(`  Password: ${newPassword}`);
      }
    }
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

updatePassword();

