import type { Express } from "express";
import { getDb } from "./db";
import { users } from "@/../../drizzle/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

export function registerUserRoutes(app: Express) {
  // Get all users
  app.get("/api/users", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      const allUsers = await db.select().from(users);
      res.json(allUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create new user
  app.post("/api/users", async (req, res) => {
    try {
      const { name, email, password, role, facility } = req.body;

      if (!name || !email || !role) {
        return res.status(400).json({ error: "Name, email, and role are required" });
      }

      if (!password) {
        return res.status(400).json({ error: "Password is required" });
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      // Check if user with email already exists
      const existingUser = await db.select().from(users).where(eq(users.email, email));
      if (existingUser.length > 0) {
        return res.status(400).json({ error: "User with this email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        id: nanoid(),
        name,
        email,
        password: hashedPassword,
        loginMethod: "password",
        role,
        facility: facility || null,
        createdAt: new Date(),
      };

      await db.insert(users).values(newUser);
      res.json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update user
  app.put("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, role, facility } = req.body;

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      // Check if user exists
      const existingUser = await db.select().from(users).where(eq(users.id, id));
      if (existingUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if email is being changed to an existing email
      if (email && email !== existingUser[0].email) {
        const emailCheck = await db.select().from(users).where(eq(users.email, email));
        if (emailCheck.length > 0) {
          return res.status(400).json({ error: "User with this email already exists" });
        }
      }

      const updateData: any = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (facility !== undefined) updateData.facility = facility || null;
      
      // Only update password if provided
      if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
      }

      await db.update(users).set(updateData).where(eq(users.id, id));

      const updatedUser = await db.select().from(users).where(eq(users.id, id));
      res.json(updatedUser[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete user
  app.delete("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      // Check if user exists
      const existingUser = await db.select().from(users).where(eq(users.id, id));
      if (existingUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      await db.delete(users).where(eq(users.id, id));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

