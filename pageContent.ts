import type { Express } from "express";
import { getDb } from "./db";
import { pageContent, type InsertPageContent } from "@/../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";

export function registerPageContentRoutes(app: Express) {
  // Get all page content for a specific facility
  app.get("/api/page-content/:facility", async (req, res) => {
    try {
      const { facility } = req.params;
      
      if (!["mirai", "hikari", "studio_m"].includes(facility)) {
        return res.status(400).send("Invalid facility");
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).send("Database not available");
      }

      const contents = await db
        .select()
        .from(pageContent)
        .where(eq(pageContent.facility, facility as any));

      res.json(contents);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });

  // Get specific page content section
  app.get("/api/page-content/:facility/:section", async (req, res) => {
    try {
      const { facility, section } = req.params;
      
      if (!["mirai", "hikari", "studio_m"].includes(facility)) {
        return res.status(400).send("Invalid facility");
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).send("Database not available");
      }

      const result = await db
        .select()
        .from(pageContent)
        .where(
          and(
            eq(pageContent.facility, facility as any),
            eq(pageContent.section, section)
          )
        )
        .limit(1);

      if (result.length === 0) {
        return res.status(404).send("Content not found");
      }

      res.json(result[0]);
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });

  // Create or update page content
  app.post("/api/page-content", async (req, res) => {
    try {
      // Check authentication
      if (!req.user) {
        return res.status(401).send("認証が必要です");
      }

      const { facility, section, content, updatedBy } = req.body;

      if (!facility || !section || !content || !updatedBy) {
        return res.status(400).send("Missing required fields");
      }

      if (!["mirai", "hikari", "studio_m"].includes(facility)) {
        return res.status(400).send("Invalid facility");
      }

      // Check permission
      const userRole = req.user.role as string;
      const userFacility = (req.user as any).facility as string | null;
      
      if (userRole !== "admin") {
        if ((userRole === "mirai_admin" && facility !== "mirai") ||
            (userRole === "hikari_admin" && facility !== "hikari") ||
            (userRole === "studio_m_admin" && facility !== "studio_m")) {
          return res.status(403).send("この事業所のページコンテンツを編集する権限がありません");
        }
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).send("Database not available");
      }

      // Check if content already exists
      const existing = await db
        .select()
        .from(pageContent)
        .where(
          and(
            eq(pageContent.facility, facility),
            eq(pageContent.section, section)
          )
        )
        .limit(1);

      if (existing.length > 0) {
        // Update existing content
        await db
          .update(pageContent)
          .set({
            content,
            updatedBy,
            updatedAt: new Date(),
          })
          .where(eq(pageContent.id, existing[0].id));

        res.json({ ...existing[0], content, updatedBy, updatedAt: new Date() });
      } else {
        // Create new content
        const newContent: InsertPageContent = {
          id: nanoid(),
          facility,
          section,
          content,
          updatedBy,
        };

        await db.insert(pageContent).values(newContent);

        res.json(newContent);
      }
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });

  // Update page content
  app.put("/api/page-content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { content, updatedBy } = req.body;

      if (!content || !updatedBy) {
        return res.status(400).send("Missing required fields");
      }

      const db = await getDb();
      if (!db) {
        return res.status(500).send("Database not available");
      }

      await db
        .update(pageContent)
        .set({
          content,
          updatedBy,
          updatedAt: new Date(),
        })
        .where(eq(pageContent.id, id));

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });

  // Delete page content
  app.delete("/api/page-content/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const db = await getDb();
      if (!db) {
        return res.status(500).send("Database not available");
      }

      await db.delete(pageContent).where(eq(pageContent.id, id));

      res.json({ success: true });
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  });
}

