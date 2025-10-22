import { Router } from "express";
import { getDb } from "../db";
import { announcements } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

/**
 * GET /api/announcements
 * 公開されているお知らせ一覧を取得
 */
router.get("/", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const publishedAnnouncements = await db
      .select()
      .from(announcements)
      .where(eq(announcements.isPublished, "published"))
      .orderBy(desc(announcements.publishedAt))
      .limit(10);

    res.json(publishedAnnouncements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "お知らせの取得に失敗しました" });
  }
});

/**
 * GET /api/announcements/:id
 * 特定のお知らせを取得
 */
router.get("/:id", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const { id } = req.params;
    const announcement = await db
      .select()
      .from(announcements)
      .where(eq(announcements.id, parseInt(id)))
      .limit(1);

    if (announcement.length === 0) {
      return res.status(404).json({ error: "お知らせが見つかりません" });
    }

    res.json(announcement[0]);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(500).json({ error: "お知らせの取得に失敗しました" });
  }
});

/**
 * POST /api/announcements
 * 新しいお知らせを作成（将来的に認証機能を追加）
 */
router.post("/", async (req, res) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const { title, content, facility, authorId } = req.body;

    if (!title || !content || !facility || !authorId) {
      return res.status(400).json({ error: "必須項目が不足しています" });
    }

    const newAnnouncement = await db.insert(announcements).values({
      title,
      content,
      facility,
      isPublished: "published",
      authorId,
      publishedAt: new Date(),
    });

    res.status(201).json({
      message: "お知らせを作成しました",
      id: newAnnouncement[0].insertId,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "お知らせの作成に失敗しました" });
  }
});

export default router;

