Text file: db.ts
Latest content with line numbers:
1	import { eq } from "drizzle-orm";
2	import { drizzle } from "drizzle-orm/mysql2";
3	import { announcements, InsertAnnouncement, InsertUser, users } from "../drizzle/schema";
4	import { ENV } from './_core/env';
5	
6	let _db: ReturnType<typeof drizzle> | null = null;
7	
8	// Lazily create the drizzle instance so local tooling can run without a DB.
9	export async function getDb() {
10	  if (!_db && process.env.DATABASE_URL) {
11	    try {
12	      _db = drizzle(process.env.DATABASE_URL);
13	    } catch (error) {
14	      console.warn("[Database] Failed to connect:", error);
15	      _db = null;
16	    }
17	  }
18	  return _db;
19	}
20	
21	export async function upsertUser(user: InsertUser): Promise<void> {
22	  if (!user.id) {
23	    throw new Error("User ID is required for upsert");
24	  }
25	
26	  const db = await getDb();
27	  if (!db) {
28	    console.warn("[Database] Cannot upsert user: database not available");
29	    return;
30	  }
31	
32	  try {
33	    const values: InsertUser = {
34	      id: user.id,
35	    };
36	    const updateSet: Record<string, unknown> = {};
37	
38	    const textFields = ["name", "email", "loginMethod"] as const;
39	    type TextField = (typeof textFields)[number];
40	
41	    const assignNullable = (field: TextField) => {
42	      const value = user[field];
43	      if (value === undefined) return;
44	      const normalized = value ?? null;
45	      values[field] = normalized;
46	      updateSet[field] = normalized;
47	    };
48	
49	    textFields.forEach(assignNullable);
50	
51	    if (user.lastSignedIn !== undefined) {
52	      values.lastSignedIn = user.lastSignedIn;
53	      updateSet.lastSignedIn = user.lastSignedIn;
54	    }
55	    if (user.role === undefined) {
56	      if (user.id === ENV.ownerId) {
57	        user.role = 'admin';
58	        values.role = 'admin';
59	        updateSet.role = 'admin';
60	      }
61	    }
62	
63	    if (Object.keys(updateSet).length === 0) {
64	      updateSet.lastSignedIn = new Date();
65	    }
66	
67	    await db.insert(users).values(values).onDuplicateKeyUpdate({
68	      set: updateSet,
69	    });
70	  } catch (error) {
71	    console.error("[Database] Failed to upsert user:", error);
72	    throw error;
73	  }
74	}
75	
76	export async function getUser(id: string) {
77	  const db = await getDb();
78	  if (!db) {
79	    console.warn("[Database] Cannot get user: database not available");
80	    return undefined;
81	  }
82	
83	  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
84	
85	  return result.length > 0 ? result[0] : undefined;
86	}
87	
88	// Announcement queries
89	export async function createAnnouncement(announcement: any) {
90	  const db = await getDb();
91	  if (!db) {
92	    throw new Error("Database not available");
93	  }
94	
95	  const id = `ann_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
96	  const now = new Date();
97	
98	  await db.insert(announcements).values({
99	    id,
100	    ...announcement,
101	    imageUrls: announcement.imageUrls ? JSON.stringify(announcement.imageUrls) : null,
102	    createdAt: now,
103	    updatedAt: now,
104	  });
105	
106	  return id;
107	}
108	
109	export async function updateAnnouncement(id: string, updates: Partial<Omit<InsertAnnouncement, "id" | "createdAt" | "authorId">>) {
110	  const db = await getDb();
111	  if (!db) {
112	    throw new Error("Database not available");
113	  }
114	
115	  const updateData: any = { ...updates, updatedAt: new Date() };
116	  if (updates.imageUrls !== undefined) {
117	    updateData.imageUrls = updates.imageUrls ? JSON.stringify(updates.imageUrls) : null;
118	  }
119	  
120	  await db.update(announcements)
121	    .set(updateData)
122	    .where(eq(announcements.id, id));
123	}
124	
125	export async function deleteAnnouncement(id: string) {
126	  const db = await getDb();
127	  if (!db) {
128	    throw new Error("Database not available");
129	  }
130	
131	  await db.delete(announcements).where(eq(announcements.id, id));
132	}
133	
134	export async function getAnnouncements(facility?: string, publishedOnly = true) {
135	  const db = await getDb();
136	  if (!db) {
137	    return [];
138	  }
139	
140	  let query = db.select().from(announcements);
141	
142	  if (publishedOnly) {
143	    query = query.where(eq(announcements.isPublished, "published")) as any;
144	  }
145	
146	  const results = await query;
147	
148	  if (facility) {
149	    return results.filter(a => a.facility === facility || a.facility === "organization");
150	  }
151	
152	  return results;
153	}
154	
155	export async function getAnnouncementById(id: string) {
156	  const db = await getDb();
157	  if (!db) {
158	    return undefined;
159	  }
160	
161	  const result = await db.select().from(announcements).where(eq(announcements.id, id)).limit(1);
162	  return result.length > 0 ? result[0] : undefined;
163	}
164	