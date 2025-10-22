Text file: auth.ts
Latest content with line numbers:
1	import { Router, Request, Response } from "express";
2	import bcrypt from "bcryptjs";
3	import { getDb } from "../db";
4	import { users } from "../../drizzle/schema";
5	import { eq } from "drizzle-orm";
6	import session from "express-session";
7	
8	const router = Router();
9	
10	// Extend Express Request type for session
11	declare module "express-session" {
12	  interface SessionData {
13	    userId: string;
14	  }
15	}
16	
17	declare global {
18	  namespace Express {
19	    interface Request {
20	      session: session.Session & Partial<session.SessionData>;
21	    }
22	  }
23	}
24	
25	/**
26	 * POST /api/auth/register
27	 * Register a new user (admin only)
28	 */
29	router.post("/register", async (req: Request, res: Response) => {
30	  try {
31	    const db = await getDb();
32	    if (!db) {
33	      return res.status(503).json({ error: "データベースが利用できません" });
34	    }
35	
36	    // Check if user is authenticated and is admin
37	    if (!req.session.userId) {
38	      return res.status(401).json({ error: "認証が必要です" });
39	    }
40	
41	    const currentUser = await db
42	      .select()
43	      .from(users)
44	      .where(eq(users.id, req.session.userId))
45	      .limit(1);
46	
47	    if (currentUser.length === 0 || currentUser[0].role !== "admin") {
48	      return res.status(403).json({ error: "管理者権限が必要です" });
49	    }
50	
51	    const { name, email, password, role, facility } = req.body;
52	
53	    // Validate required fields
54	    if (!name || !email || !password || !role) {
55	      return res.status(400).json({ error: "必須項目が不足しています" });
56	    }
57	
58	    // Check if email already exists
59	    const existingUser = await db
60	      .select()
61	      .from(users)
62	      .where(eq(users.email, email))
63	      .limit(1);
64	
65	    if (existingUser.length > 0) {
66	      return res.status(400).json({ error: "このメールアドレスは既に登録されています" });
67	    }
68	
69	    // Hash password
70	    const hashedPassword = await bcrypt.hash(password, 10);
71	
72	    // Generate user ID
73	    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
74	
75	    // Insert user
76	    await db.insert(users).values({
77	      id: userId,
78	      name,
79	      email,
80	      password: hashedPassword,
81	      role,
82	      facility: facility || null,
83	      loginMethod: "password",
84	    });
85	
86	    res.json({
87	      success: true,
88	      message: "ユーザーを登録しました",
89	    });
90	  } catch (error) {
91	    console.error("Error registering user:", error);
92	    res.status(500).json({ error: "ユーザー登録に失敗しました" });
93	  }
94	});
95	
96	/**
97	 * POST /api/auth/login
98	 * Login with email and password
99	 */
100	router.post("/login", async (req: Request, res: Response) => {
101	  try {
102	    const db = await getDb();
103	    if (!db) {
104	      return res.status(503).json({ error: "データベースが利用できません" });
105	    }
106	
107	    const { email, password } = req.body;
108	
109	    // Validate required fields
110	    if (!email || !password) {
111	      return res.status(400).json({ error: "メールアドレスとパスワードを入力してください" });
112	    }
113	
114	    // Find user by email
115	    const userResult = await db
116	      .select()
117	      .from(users)
118	      .where(eq(users.email, email))
119	      .limit(1);
120	
121	    if (userResult.length === 0) {
122	      return res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません" });
123	    }
124	
125	    const user = userResult[0];
126	
127	    // Check if user has a password (password login method)
128	    if (!user.password) {
129	      return res.status(401).json({ error: "このアカウントはパスワードログインに対応していません" });
130	    }
131	
132	    // Verify password
133	    const isPasswordValid = await bcrypt.compare(password, user.password);
134	
135	    if (!isPasswordValid) {
136	      return res.status(401).json({ error: "メールアドレスまたはパスワードが正しくありません" });
137	    }
138	
139	    // Update last signed in
140	    await db
141	      .update(users)
142	      .set({ lastSignedIn: new Date() })
143	      .where(eq(users.id, user.id));
144	
145	    // Set session
146	    req.session.userId = user.id;
147	
148	    // Save session explicitly
149	    req.session.save((err: any) => {      if (err) {
150	        console.error("Error saving session:", err);
151	        return res.status(500).json({ error: "セッションの保存に失敗しました" });
152	      }
153	
154	      res.json({
155	        success: true,
156	        user: {
157	          id: user.id,
158	          name: user.name,
159	          email: user.email,
160	          role: user.role,
161	          facility: user.facility,
162	        },
163	      });
164	    });
165	  } catch (error) {
166	    console.error("Error logging in:", error);
167	    res.status(500).json({ error: "ログインに失敗しました" });
168	  }
169	});
170	
171	/**
172	 * POST /api/auth/logout
173	 * Logout current user
174	 */
175	router.post("/logout", (req: Request, res: Response) => {
176	  req.session.destroy((err: any) => {
177	    if (err) {
178	      console.error("Error destroying session:", err);
179	      return res.status(500).json({ error: "ログアウトに失敗しました" });
180	    }
181	    res.json({ success: true, message: "ログアウトしました" });
182	  });
183	});
184	
185	/**
186	 * GET /api/auth/me
187	 * Get current user info
188	 */
189	router.get("/me", async (req: Request, res: Response) => {
190	  try {
191	    if (!req.session.userId) {
192	      return res.status(401).json({ error: "認証が必要です" });
193	    }
194	
195	    const db = await getDb();
196	    if (!db) {
197	      return res.status(503).json({ error: "データベースが利用できません" });
198	    }
199	
200	    const userResult = await db
201	      .select()
202	      .from(users)
203	      .where(eq(users.id, req.session.userId))
204	      .limit(1);
205	
206	    if (userResult.length === 0) {
207	      req.session.destroy(() => {});
208	      return res.status(401).json({ error: "ユーザーが見つかりません" });
209	    }
210	
211	    const user = userResult[0];
212	
213	    res.json({
214	      id: user.id,
215	      name: user.name,
216	      email: user.email,
217	      role: user.role,
218	      facility: user.facility,
219	    });
220	  } catch (error) {
221	    console.error("Error getting user info:", error);
222	    res.status(500).json({ error: "ユーザー情報の取得に失敗しました" });
223	  }
224	});
225	
226	export default router;
227	
228	