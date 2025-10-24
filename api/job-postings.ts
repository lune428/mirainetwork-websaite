import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../server/db";
import { jobPostings } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "データベース接続エラー" });
    }

    // GET /api/job-postings - Get all published job postings
    if (req.method === "GET") {
      const posts = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.isPublished, 1));
      
      return res.json(posts);
    }

    // Method not allowed
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    console.error("Error in job-postings API:", error);
    return res.status(500).json({ error: "求人情報の取得に失敗しました" });
  }
}

