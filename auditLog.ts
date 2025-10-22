import type { Express } from "express";
import { getDb } from "./db";
import { auditLog } from "@/../../drizzle/schema";
import { desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export function registerAuditLogRoutes(app: Express) {
  // Get all audit logs
  app.get("/api/audit-log", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      const logs = await db
        .select()
        .from(auditLog)
        .orderBy(desc(auditLog.createdAt))
        .limit(100); // Limit to last 100 entries

      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create audit log entry
  app.post("/api/audit-log", async (req, res) => {
    try {
      const { action, entityType, entityId, userId, userName, details } = req.body;

      if (!action || !entityType || !entityId || !userId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "Database not available" });
      }

      const logEntry = {
        id: nanoid(),
        action,
        entityType,
        entityId,
        userId,
        userName: userName || null,
        details: details || null,
        createdAt: new Date(),
      };

      await db.insert(auditLog).values(logEntry);
      res.json(logEntry);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

