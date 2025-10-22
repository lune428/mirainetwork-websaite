Text file: announcements.ts
Latest content with line numbers:
2	import { getDb } from "../db";
3	import { announcements } from "../../drizzle/schema";
4	import { eq, desc } from "drizzle-orm";
5	
6	const router = Router();
7	
8	/**
9	 * GET /api/announcements
10	 * 公開されているお知らせ一覧を取得
11	 */
12	router.get("/", async (req, res) => {
13	  try {
14	    const db = await getDb();
15	    if (!db) {
16	      return res.status(503).json({ error: "データベースが利用できません" });
17	    }
18	
19	    const publishedAnnouncements = await db
20	      .select()
21	      .from(announcements)
22	      .where(eq(announcements.isPublished, "published"))
23	      .orderBy(desc(announcements.publishedAt))
24	      .limit(10);
25	
26	    // Parse images field from JSON string to array
27	    const announcementsWithParsedImages = publishedAnnouncements.map(announcement => ({
28	      ...announcement,
29	      images: announcement.images ? JSON.parse(announcement.images as string) : []
30	    }));
31	
32	    res.json(announcementsWithParsedImages);
33	  } catch (error) {
34	    console.error("Error fetching announcements:", error);
35	    res.status(500).json({ error: "お知らせの取得に失敗しました" });
36	  }
37	});
38	
39	/**
40	 * GET /api/announcements/:id
41	 * 特定のお知らせを取得
42	 */
43	router.get("/:id", async (req, res) => {
44	  try {
45	    const db = await getDb();
46	    if (!db) {
47	      return res.status(503).json({ error: "データベースが利用できません" });
48	    }
49	
50	    const { id } = req.params;