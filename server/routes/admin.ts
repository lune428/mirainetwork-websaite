import { Router, Request, Response, NextFunction } from "express";
import { getDb } from "../db";
import { announcements, users } from "../../drizzle/schema";
import { eq, and, desc, count, sql } from "drizzle-orm";

const router = Router();

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        facility?: string;
      };
    }
  }
}

// Middleware to check if user is authenticated
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: "認証が必要です" });
  }
  next();
}

// Middleware to check if user is admin or facility admin
async function requireAdminRole(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "認証が必要です" });
    }

    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.id, req.session.userId))
      .limit(1);

    if (userResult.length === 0) {
      return res.status(401).json({ error: "ユーザーが見つかりません" });
    }

    const user = userResult[0];
    const role = user.role;

    if (role !== "admin" && !role?.includes("_admin")) {
      return res.status(403).json({ error: "管理者権限が必要です" });
    }

    // Set req.user for subsequent middleware
    req.user = {
      id: user.id,
      role: user.role,
      facility: user.facility || undefined,
    };

    next();
  } catch (error) {
    console.error("Error in requireAdminRole middleware:", error);
    res.status(500).json({ error: "認証処理に失敗しました" });
  }
}

// Get dashboard stats
router.get("/stats", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const isAdmin = req.user!.role === "admin";
    const userFacility = req.user!.facility;

    let result;
    
    // If not admin, filter by facility
    if (!isAdmin && userFacility) {
      result = await db.select({
        total: count(),
        pending: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'pending' THEN 1 ELSE 0 END)`,
        published: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'published' THEN 1 ELSE 0 END)`,
        draft: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'draft' THEN 1 ELSE 0 END)`,
      }).from(announcements).where(eq(announcements.facility, userFacility as any));
    } else {
      result = await db.select({
        total: count(),
        pending: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'pending' THEN 1 ELSE 0 END)`,
        published: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'published' THEN 1 ELSE 0 END)`,
        draft: sql<number>`SUM(CASE WHEN ${announcements.isPublished} = 'draft' THEN 1 ELSE 0 END)`,
      }).from(announcements);
    }
    const stats = result[0];

    res.json({
      totalAnnouncements: Number(stats.total) || 0,
      pendingApproval: Number(stats.pending) || 0,
      published: Number(stats.published) || 0,
      draft: Number(stats.draft) || 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "統計情報の取得に失敗しました" });
  }
});

// Get all announcements (admin can see all, facility admin can see only their facility)
router.get("/announcements", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const isAdmin = req.user!.role === "admin";
    const userFacility = req.user!.facility;

    let query = db
      .select()
      .from(announcements)
      .orderBy(desc(announcements.createdAt));

    const results = await query;

    // Parse images field from JSON string to array
    const resultsWithParsedImages = results.map(announcement => ({
      ...announcement,
      images: announcement.images ? JSON.parse(announcement.images as string) : []
    }));

    // If not admin, filter by facility
    if (!isAdmin && userFacility) {
      const filtered = resultsWithParsedImages.filter((a) => a.facility === userFacility);
      return res.json(filtered);
    }

    res.json(resultsWithParsedImages);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ error: "お知らせの取得に失敗しました" });
  }
});

// Get single announcement
router.get("/announcements/:id", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const id = parseInt(req.params.id);
    const result = await db
      .select()
      .from(announcements)
      .where(eq(announcements.id, id))
      .limit(1);

    if (result.length === 0) {
      return res.status(404).json({ error: "お知らせが見つかりません" });
    }

    const announcement = result[0];
    const isAdmin = req.user!.role === "admin";
    const userFacility = req.user!.facility;

    // Check if user has permission to view this announcement
    if (!isAdmin && announcement.facility !== userFacility) {
      return res.status(403).json({ error: "アクセス権限がありません" });
    }

    // Parse images field from JSON string to array
    const announcementWithParsedImages = {
      ...announcement,
      images: announcement.images ? JSON.parse(announcement.images as string) : []
    };

    res.json(announcementWithParsedImages);
  } catch (error) {
    console.error("Error fetching announcement:", error);
    res.status(500).json({ error: "お知らせの取得に失敗しました" });
  }
});

// Create announcement
router.post("/announcements", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const { title, content, facility, isPublished, images } = req.body;
    const isAdmin = req.user!.role === "admin";
    const userFacility = req.user!.facility;

    // Facility admins can only create for their facility
    if (!isAdmin && facility !== userFacility) {
      return res.status(403).json({ error: "他の事業所のお知らせは作成できません" });
    }

    // Facility admins cannot directly publish
    let status = isPublished;
    if (!isAdmin && isPublished === "published") {
      status = "pending";
    }

    const result = await db.insert(announcements).values({
      title,
      content,
      facility,
      isPublished: status,
      images: images ? JSON.stringify(images) : null,
      authorId: req.user!.id,
      publishedAt: status === "published" ? new Date() : null,
    });

    res.json({ success: true, id: result[0].insertId });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "お知らせの作成に失敗しました" });
  }
});

// Update announcement
router.put("/announcements/:id", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const id = parseInt(req.params.id);
    const { title, content, facility, isPublished, images } = req.body;
    const isAdmin = req.user!.role === "admin";
    const userFacility = req.user!.facility;

    // Get existing announcement
    const existing = await db
      .select()
      .from(announcements)
      .where(eq(announcements.id, id))
      .limit(1);

    if (existing.length === 0) {
      return res.status(404).json({ error: "お知らせが見つかりません" });
    }

    // Check permission
    if (!isAdmin && existing[0].facility !== userFacility) {
      return res.status(403).json({ error: "アクセス権限がありません" });
    }

    // Facility admins cannot directly publish
    let status = isPublished;
    if (!isAdmin && isPublished === "published") {
      status = "pending";
    }

    await db
      .update(announcements)
      .set({
        title,
        content,
        facility,
        isPublished: status,
        images: images ? JSON.stringify(images) : existing[0].images,
        publishedAt: status === "published" ? new Date() : existing[0].publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(announcements.id, id));

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({ error: "お知らせの更新に失敗しました" });
  }
});

// Delete announcement
router.delete("/announcements/:id", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const id = parseInt(req.params.id);
    const isAdmin = req.user!.role === "admin";
    const userFacility = req.user!.facility;

    // Get existing announcement
    const existing = await db
      .select()
      .from(announcements)
      .where(eq(announcements.id, id))
      .limit(1);

    if (existing.length === 0) {
      return res.status(404).json({ error: "お知らせが見つかりません" });
    }

    // Check permission
    if (!isAdmin && existing[0].facility !== userFacility) {
      return res.status(403).json({ error: "アクセス権限がありません" });
    }

    await db.delete(announcements).where(eq(announcements.id, id));

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ error: "お知らせの削除に失敗しました" });
  }
});

// Approve announcement (admin only)
router.post("/announcements/:id/approve", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const id = parseInt(req.params.id);
    const isAdmin = req.user!.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({ error: "承認は法人管理者のみ可能です" });
    }

    await db
      .update(announcements)
      .set({
        isPublished: "published",
        publishedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(announcements.id, id));

    res.json({ success: true });
  } catch (error) {
    console.error("Error approving announcement:", error);
    res.status(500).json({ error: "お知らせの承認に失敗しました" });
  }
});

// Reject announcement (admin only)
router.post("/announcements/:id/reject", requireAdminRole, async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    if (!db) {
      return res.status(503).json({ error: "データベースが利用できません" });
    }

    const id = parseInt(req.params.id);
    const isAdmin = req.user!.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({ error: "却下は法人管理者のみ可能です" });
    }

    await db
      .update(announcements)
      .set({
        isPublished: "rejected",
        updatedAt: new Date(),
      })
      .where(eq(announcements.id, id));

    res.json({ success: true });
  } catch (error) {
    console.error("Error rejecting announcement:", error);
    res.status(500).json({ error: "お知らせの却下に失敗しました" });
  }
});

export default router;

