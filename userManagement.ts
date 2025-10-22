import type { Express, Request, Response } from "express";
import { getDb } from "./db";
import { users } from "../drizzle/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { createAuditLog } from "./auditLog";

export function registerUserManagementRoutes(app: Express) {
  // Get all users (admin only)
  app.get("/api/users", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can view users" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const allUsers = await db.select().from(users);

      res.json(allUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create a new user (admin only)
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can create users" });
      }

      const { name, email, role, facility } = req.body;

      if (!name || !email || !role) {
        return res.status(400).json({ error: "Name, email, and role are required" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Check if email already exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (existing.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const newUserId = nanoid();

      await db.insert(users).values({
        id: newUserId,
        name,
        email,
        loginMethod: "manual",
        role,
        facility: facility || null,
      });

      // Create audit log
      await createAuditLog({
        userId: user.id,
        userName: user.name,
        action: "create",
        entityType: "user",
        entityId: newUserId,
        changes: { name, email, role, facility },
      });

      res.json({ message: "User created successfully", id: newUserId });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update a user (admin only)
  app.put("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can update users" });
      }

      const { id } = req.params;
      const { name, email, role, facility } = req.body;

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get existing user
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      if (existing.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      await db
        .update(users)
        .set({
          name: name || existing[0].name,
          email: email || existing[0].email,
          role: role || existing[0].role,
          facility: facility !== undefined ? facility : existing[0].facility,
        })
        .where(eq(users.id, id));

      // Create audit log
      await createAuditLog({
        userId: user.id,
        userName: user.name,
        action: "update",
        entityType: "user",
        entityId: id,
        changes: { name, email, role, facility },
      });

      res.json({ message: "User updated successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a user (admin only)
  app.delete("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can delete users" });
      }

      const { id } = req.params;

      // Prevent deleting self
      if (id === user.id) {
        return res.status(400).json({ error: "Cannot delete your own account" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get user info before deleting
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);

      if (existing.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      await db.delete(users).where(eq(users.id, id));

      // Create audit log
      await createAuditLog({
        userId: user.id,
        userName: user.name,
        action: "delete",
        entityType: "user",
        entityId: id,
        changes: { deletedUser: existing[0].name },
      });

      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

