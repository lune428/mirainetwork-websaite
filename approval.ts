import type { Express, Request, Response } from "express";
import { getDb } from "./db";
import { announcements } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { createAuditLog } from "./auditLog";
import { createNotification } from "./notifications";

export function registerApprovalRoutes(app: Express) {
  // Approve an announcement
  app.post("/api/announcements/:id/approve", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = (req as any).user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can approve announcements" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get the announcement
      const announcement = await db
        .select()
        .from(announcements)
        .where(eq(announcements.id, id))
        .limit(1);

      if (announcement.length === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }

      const ann = announcement[0];

      // Update status to approved and published
      await db
        .update(announcements)
        .set({
          status: "published",
          approvedBy: user.id,
          approvedAt: new Date(),
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(announcements.id, id));

      // Create audit log
      await createAuditLog({
        userId: user.id,
        userName: user.name,
        action: "approve",
        entityType: "announcement",
        entityId: id,
        facility: ann.facility,
        changes: { status: "pending → published" },
      });

      // Create notification for the author
      await createNotification({
        userId: ann.authorId,
        type: "approved",
        title: "お知らせが承認されました",
        message: `「${ann.title}」が承認され、公開されました。`,
        entityType: "announcement",
        entityId: id,
      });

      res.json({ message: "Announcement approved successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Reject an announcement
  app.post("/api/announcements/:id/reject", async (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const user = (req as any).user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can reject announcements" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      // Get the announcement
      const announcement = await db
        .select()
        .from(announcements)
        .where(eq(announcements.id, id))
        .limit(1);

      if (announcement.length === 0) {
        return res.status(404).json({ error: "Announcement not found" });
      }

      const ann = announcement[0];

      // Update status to rejected
      await db
        .update(announcements)
        .set({
          status: "rejected",
          rejectionReason: reason || "理由が指定されていません",
          updatedAt: new Date(),
        })
        .where(eq(announcements.id, id));

      // Create audit log
      await createAuditLog({
        userId: user.id,
        userName: user.name,
        action: "reject",
        entityType: "announcement",
        entityId: id,
        facility: ann.facility,
        changes: { status: "pending → rejected", reason },
      });

      // Create notification for the author
      await createNotification({
        userId: ann.authorId,
        type: "rejected",
        title: "お知らせが却下されました",
        message: `「${ann.title}」が却下されました。理由: ${reason || "理由が指定されていません"}`,
        entityType: "announcement",
        entityId: id,
      });

      res.json({ message: "Announcement rejected successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get pending announcements (for admin review)
  app.get("/api/announcements/pending", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can view pending announcements" });
      }

      const db = await getDb();
      if (!db) throw new Error("Database not available");

      const pending = await db
        .select()
        .from(announcements)
        .where(eq(announcements.status, "pending"))
        .orderBy(announcements.createdAt);

      res.json(pending);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

