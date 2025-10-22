Text file: benefits.ts
Latest content with line numbers:
2	import { getDb } from "../db";
3	import { benefits } from "../../drizzle/schema";
4	import { eq, asc } from "drizzle-orm";
5	import { sdk } from "../_core/sdk";
6	
7	export function registerBenefitsRoutes(app: Express) {
8	  // Get all published benefits
9	  app.get("/api/benefits", async (req, res) => {
10	    try {
11	      const db = await getDb();
12	      if (!db) {
13	        return res.status(500).json({ error: "データベース接続エラー" });
14	      }
15	      const items = await db
16	        .select()
17	        .from(benefits)
18	        .where(eq(benefits.isPublished, true))
19	        .orderBy(asc(benefits.displayOrder));
20	      
21	      res.json(items);
22	    } catch (error: any) {
23	      console.error("Error fetching benefits:", error);
24	      res.status(500).json({ error: "福利厚生情報の取得に失敗しました" });
25	    }
26	  });
27	
28	  // Admin: Get all benefits (including unpublished)
29	  app.get("/api/admin/benefits", async (req, res) => {
30	    try {