import type { Express } from "express";
import { getDb } from "../db";
import { benefits } from "../../drizzle/schema";
import { eq, asc } from "drizzle-orm";
import { sdk } from "../_core/sdk";

export function registerBenefitsRoutes(app: Express) {
  // Get all published benefits
  app.get("/api/benefits", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      const items = await db
        .select()
        .from(benefits)
        .where(eq(benefits.isPublished, true))
        .orderBy(asc(benefits.displayOrder));
      
      res.json(items);
    } catch (error: any) {
      console.error("Error fetching benefits:", error);
      res.status(500).json({ error: "福利厚生情報の取得に失敗しました" });
    }
  });

  // Admin: Get all benefits (including unpublished)
  app.get("/api/admin/benefits", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const items = await db
        .select()
        .from(benefits)
        .orderBy(asc(benefits.displayOrder));
      res.json(items);
    } catch (error: any) {
      console.error("Error fetching benefits:", error);
      res.status(500).json({ error: "福利厚生情報の取得に失敗しました" });
    }
  });

  // Admin: Create new benefit
  app.post("/api/admin/benefits", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const user = await sdk.authenticateRequest(req);
      if (!user) {
        return res.status(401).json({ error: "認証が必要です" });
      }

      const benefitData = {
        ...req.body,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const [newBenefit] = await db.insert(benefits).values(benefitData);
      res.json({ success: true, id: newBenefit.insertId });
    } catch (error: any) {
      console.error("Error creating benefit:", error);
      res.status(500).json({ error: "福利厚生情報の作成に失敗しました" });
    }
  });

  // Admin: Update benefit
  app.put("/api/admin/benefits/:id", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const user = await sdk.authenticateRequest(req);
      if (!user) {
        return res.status(401).json({ error: "認証が必要です" });
      }
      
      const id = parseInt(req.params.id);
      const updateData = {
        ...req.body,
        updatedAt: new Date(),
      };

      await db.update(benefits).set(updateData).where(eq(benefits.id, id));
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error updating benefit:", error);
      res.status(500).json({ error: "福利厚生情報の更新に失敗しました" });
    }
  });

  // Admin: Delete benefit
  app.delete("/api/admin/benefits/:id", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const user = await sdk.authenticateRequest(req);
      if (!user) {
        return res.status(401).json({ error: "認証が必要です" });
      }
      
      const id = parseInt(req.params.id);
      await db.delete(benefits).where(eq(benefits.id, id));
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting benefit:", error);
      res.status(500).json({ error: "福利厚生情報の削除に失敗しました" });
    }
  });
}

