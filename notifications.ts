import type { Express } from "express";
import { getDb } from "./db";
import { notifications } from "@/../../drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export function registerNotificationRoutes(app: Express) {
  // Get notifications for a user
  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      const userNotifications = await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, userId))
        .orderBy(desc(notifications.createdAt));

      res.json(userNotifications);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create notification
  app.post("/api/notifications", async (req, res) => {
    try {
      const { userId, type, title, message, relatedId } = req.body;

      if (!userId || !type || !title || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      const notification = {
        id: nanoid(),
        userId,
        type,
        title,
        message,
        relatedId: relatedId || null,
        read: false,
        createdAt: new Date(),
      };

      await db.insert(notifications).values(notification);
      res.json(notification);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Mark notification as read
  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      const { id } = req.params;

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      await db
        .update(notifications)
        .set({ read: true })
        .where(eq(notifications.id, id));

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Mark all notifications as read for a user
  app.patch("/api/notifications/:userId/read-all", async (req, res) => {
    try {
      const { userId } = req.params;

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      await db
        .update(notifications)
        .set({ read: true })
        .where(eq(notifications.userId, userId));

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

