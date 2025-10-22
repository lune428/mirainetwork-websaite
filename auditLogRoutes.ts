import type { Express, Request, Response } from "express";
import { getAuditLogs } from "./auditLog";

export function registerAuditLogRoutes(app: Express) {
  // Get audit logs with optional filters
  app.get("/api/audit-logs", async (req: Request, res: Response) => {
    try {
      const { entityType, entityId, userId, facility, limit } = req.query;

      const logs = await getAuditLogs({
        entityType: entityType as any,
        entityId: entityId as string,
        userId: userId as string,
        facility: facility as any,
        limit: limit ? parseInt(limit as string) : 100,
      });

      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get audit logs for a specific entity
  app.get("/api/audit-logs/:entityType/:entityId", async (req: Request, res: Response) => {
    try {
      const { entityType, entityId } = req.params;

      const logs = await getAuditLogs({
        entityType: entityType as any,
        entityId,
        limit: 50,
      });

      res.json(logs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

