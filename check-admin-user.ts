import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

async function checkAdminUser() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL!);

  try {
    console.log("Checking admin user...\n");
    
    const [users] = await connection.query(
      "SELECT id, name, email, role, facility, createdAt, password FROM users WHERE email = ?",
      ["mirainet2017@gmail.com"]
    ) as any;
    
    if (users.length === 0) {
      console.log("Admin user not found!");
    } else {
      const user = users[0];
      console.log("Admin user found:");
      console.log(`- ID: ${user.id}`);
      console.log(`- Name: ${user.name}`);
      console.log(`- Email: ${user.email}`);
      console.log(`- Role: ${user.role}`);
      console.log(`- Facility: ${user.facility}`);
      console.log(`- Created At: ${user.createdAt}`);
      console.log(`- Password Hash: ${user.password ? user.password.substring(0, 20) + '...' : 'NULL'}`);
    }
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

checkAdminUser();

