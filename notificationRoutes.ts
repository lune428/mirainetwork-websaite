import type { Express, Request, Response } from "express";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "./notifications";

export function registerNotificationRoutes(app: Express) {
  // Get user notifications
  app.get("/api/notifications", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { unreadOnly, limit } = req.query;

      const notifs = await getNotifications(user.id, {
        unreadOnly: unreadOnly === "true",
        limit: limit ? parseInt(limit as string) : 50,
      });

      res.json(notifs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Mark notification as read
  app.post("/api/notifications/:id/read", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { id } = req.params;

      await markNotificationAsRead(id);

      res.json({ message: "Notification marked as read" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Mark all notifications as read
  app.post("/api/notifications/read-all", async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      await markAllNotificationsAsRead(user.id);

      res.json({ message: "All notifications marked as read" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
}

