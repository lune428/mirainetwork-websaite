import type { Express } from "express";
import { getDb } from "./db";
import { users } from "@/../../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export function registerAuthRoutes(app: Express) {
  // Password login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      // Find user by email
      const userResults = await db.select().from(users).where(eq(users.email, email));
      
      if (userResults.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = userResults[0];

      // Check if user has a password set
      if (!user.password) {
        return res.status(401).json({ error: "This account uses OAuth login. Please use Google sign-in." });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Update last signed in
      await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

      // Return user data (excluding password)
      const { password: _, ...userWithoutPassword } = user;
      res.json({ 
        success: true, 
        user: userWithoutPassword 
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Logout endpoint
  app.post("/api/auth/logout", async (req, res) => {
    try {
      // In a real application, you would clear the session here
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get current user endpoint
  app.get("/api/auth/me", async (req, res) => {
    try {
      // In a real application, you would get the user from the session
      // For now, we'll return a placeholder
      res.json({ user: null });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

