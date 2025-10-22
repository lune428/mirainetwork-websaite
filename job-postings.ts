import type { Express } from "express";
import { getDb } from "../db";
import { jobPostings } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

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
}

