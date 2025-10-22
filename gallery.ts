Text file: gallery.ts
Latest content with line numbers:
2	import { getDb } from "./db";
3	import { gallery, type InsertGallery } from "@/../../drizzle/schema";
4	import { eq, and, desc } from "drizzle-orm";
5	import { nanoid } from "nanoid";
6	
7	export function registerGalleryRoutes(app: Express) {
8	  // Get all gallery items for a specific facility
9	  app.get("/api/gallery/:facility", async (req, res) => {
10	    try {
11	      const { facility } = req.params;
12	      
13	      if (!["mirai", "hikari", "studio_m"].includes(facility)) {
14	        return res.status(400).send("Invalid facility");
15	      }
16	
17	      const db = await getDb();
18	      if (!db) {
19	        return res.status(500).send("Database not available");
20	      }
21	
22	      const items = await db
23	        .select()
24	        .from(gallery)
25	        .where(eq(gallery.facility, facility as any))
26	        .orderBy(desc(gallery.createdAt));
27	
28	      res.json(items);
29	    } catch (error: any) {
30	      res.status(500).send(error.message);
31	    }
32	  });
33	
34	  // Get all gallery items (for admin)
35	  app.get("/api/gallery", async (req, res) => {
36	    try {
37	      const db = await getDb();
38	      if (!db) {
39	        return res.status(500).send("Database not available");
40	      }
41	
42	      const items = await db
43	        .select()
44	        .from(gallery)
45	        .orderBy(desc(gallery.createdAt));
46	
47	      res.json(items);
48	    } catch (error: any) {
49	      res.status(500).send(error.message);
50	    }