import type { Express } from "express";
import { getDb } from "../db";
import { jobPostings } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { sdk } from "../_core/sdk";

export function registerJobPostingsRoutes(app: Express) {
  // Get all published job postings
  app.get("/api/job-postings", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      const posts = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.isPublished, true));
      
      res.json(posts);
    } catch (error: any) {
      console.error("Error fetching job postings:", error);
      res.status(500).json({ error: "求人情報の取得に失敗しました" });
    }
  });

  // Get single job posting by ID
  app.get("/api/job-postings/:id", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      const id = parseInt(req.params.id);
      
      const [post] = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.id, id));
      
      if (!post) {
        return res.status(404).json({ error: "求人情報が見つかりません" });
      }
      
      res.json(post);
    } catch (error: any) {
      console.error("Error fetching job posting:", error);
      res.status(500).json({ error: "求人情報の取得に失敗しました" });
    }
  });

  // Admin: Get all job postings (including unpublished)
  app.get("/api/admin/job-postings", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const posts = await db.select().from(jobPostings);
      res.json(posts);
    } catch (error: any) {
      console.error("Error fetching job postings:", error);
      res.status(500).json({ error: "求人情報の取得に失敗しました" });
    }
  });

  // Admin: Create new job posting
  app.post("/api/admin/job-postings", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: "認証が必要です" });
      }

      const jobData = {
        ...req.body,
        createdBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const [newJob] = await db.insert(jobPostings).values(jobData);
      res.json({ success: true, id: newJob.insertId });
    } catch (error: any) {
      console.error("Error creating job posting:", error);
      res.status(500).json({ error: "求人情報の作成に失敗しました" });
    }
  });

  // Admin: Update job posting
  app.put("/api/admin/job-postings/:id", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const id = parseInt(req.params.id);
      const updateData = {
        ...req.body,
        updatedAt: new Date(),
      };

      await db.update(jobPostings).set(updateData).where(eq(jobPostings.id, id));
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error updating job posting:", error);
      res.status(500).json({ error: "求人情報の更新に失敗しました" });
    }
  });

  // Admin: Delete job posting
  app.delete("/api/admin/job-postings/:id", async (req, res) => {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(500).json({ error: "データベース接続エラー" });
      }
      
      const id = parseInt(req.params.id);
      await db.delete(jobPostings).where(eq(jobPostings.id, id));
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting job posting:", error);
      res.status(500).json({ error: "求人情報の削除に失敗しました" });
    }
  });
}

