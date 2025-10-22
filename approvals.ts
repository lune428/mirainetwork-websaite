import type { Express } from "express";
import { getDb } from "./db";
import { announcements } from "@/../../drizzle/schema";
import { eq } from "drizzle-orm";

export function registerApprovalRoutes(app: Express) {
  // Get pending announcements
  app.get("/api/announcements/pending", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      const pending = await db
        .select()
        .from(announcements)
        .where(eq(announcements.isPublished, "pending" as any));

      res.json(pending);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Approve announcement
  app.post("/api/announcements/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      // Check if announcement exists
      const announcement = await db.select().from(announcements).where(eq(announcements.id, id));
      if (announcement.length === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }

      // Update status to published
      await db
        .update(announcements)
        .set({
          isPublished: "published" as any,
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(announcements.id, id));

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Reject announcement
  app.post("/api/announcements/:id/reject", async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      // Check if announcement exists
      const announcement = await db.select().from(announcements).where(eq(announcements.id, id));
      if (announcement.length === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }

      // Update status to rejected
      await db
        .update(announcements)
        .set({
          isPublished: "rejected" as any,
          updatedAt: new Date(),
        })
        .where(eq(announcements.id, id));

      // TODO: Send notification to author with rejection reason

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

