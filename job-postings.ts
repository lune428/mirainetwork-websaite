Text file: job-postings.ts
Latest content with line numbers:
46	    } catch (error: any) {
47	      console.error("Error fetching job posting:", error);
48	      res.status(500).json({ error: "求人情報の取得に失敗しました" });
49	    }
50	  });
51	
52	  // Admin: Get all job postings (including unpublished)
53	  app.get("/api/admin/job-postings", async (req, res) => {
54	    try {
55	      const db = await getDb();
56	      if (!db) {
57	        return res.status(500).json({ error: "データベース接続エラー" });
58	      }
59	      
60	      const posts = await db.select().from(jobPostings);
61	      res.json(posts);
62	    } catch (error: any) {
63	      console.error("Error fetching job postings:", error);
64	      res.status(500).json({ error: "求人情報の取得に失敗しました" });
65	    }
66	  });
67	
68	  // Admin: Create new job posting
69	  app.post("/api/admin/job-postings", async (req, res) => {
70	    try {
71	      const db = await getDb();
72	      if (!db) {
73	        return res.status(500).json({ error: "データベース接続エラー" });
74	      }
75	      
76	      const user = req.user;
77	      if (!user) {
78	        return res.status(401).json({ error: "認証が必要です" });
79	      }
80	
81	      const jobData = {
82	        ...req.body,
83	        createdBy: user.id,
84	        createdAt: new Date(),
85	        updatedAt: new Date(),
86	      };
87	
88	      const [newJob] = await db.insert(jobPostings).values(jobData);
89	      res.json({ success: true, id: newJob.insertId });
90	    } catch (error: any) {
91	      console.error("Error creating job posting:", error);
92	      res.status(500).json({ error: "求人情報の作成に失敗しました" });
93	    }
94	  });
95	
96	  // Admin: Update job posting
97	  app.put("/api/admin/job-postings/:id", async (req, res) => {
98	    try {
99	      const db = await getDb();
100	      if (!db) {