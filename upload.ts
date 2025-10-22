Text file: upload.ts
Latest content with line numbers:
1	import { Router } from "express";
2	import multer from "multer";
3	import path from "path";
4	import fs from "fs";
5	
6	const router = Router();
7	
8	// Create uploads directory if it doesn't exist
9	const uploadsDir = path.join(process.cwd(), "public", "uploads");
10	if (!fs.existsSync(uploadsDir)) {
11	  fs.mkdirSync(uploadsDir, { recursive: true });
12	}
13	
14	// Configure multer for file uploads
15	const storage = multer.diskStorage({
16	  destination: (req, file, cb) => {
17	    cb(null, uploadsDir);
18	  },
19	  filename: (req, file, cb) => {
20	    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
21	    const ext = path.extname(file.originalname);
22	    cb(null, `announcement-${uniqueSuffix}${ext}`);
23	  },
24	});
25	
26	const upload = multer({
27	  storage,
28	  limits: {
29	    fileSize: 5 * 1024 * 1024, // 5MB limit
30	  },
31	  fileFilter: (req, file, cb) => {
32	    const allowedTypes = /jpeg|jpg|png|gif|webp/;
33	    const extname = allowedTypes.test(
34	      path.extname(file.originalname).toLowerCase()
35	    );
36	    const mimetype = allowedTypes.test(file.mimetype);
37	
38	    if (extname && mimetype) {
39	      cb(null, true);
40	    } else {
41	      cb(new Error("画像ファイルのみアップロード可能です（JPEG, PNG, GIF, WebP）"));
42	    }
43	  },
44	});
45	
46	// Upload single image
47	router.post("/image", upload.single("image"), (req, res) => {
48	  try {
49	    if (!req.file) {
50	      return res.status(400).json({ error: "画像ファイルが選択されていません" });
51	    }
52	
53	    const imageUrl = `/uploads/${req.file.filename}`;
54	    res.json({
55	      success: true,
56	      url: imageUrl,
57	      filename: req.file.filename,
58	    });
59	  } catch (error) {
60	    console.error("Image upload error:", error);
61	    res.status(500).json({ error: "画像のアップロードに失敗しました" });
62	  }
63	});
64	
65	// Upload multiple images
66	router.post("/images", upload.array("images", 5), (req, res) => {
67	  try {
68	    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
69	      return res.status(400).json({ error: "画像ファイルが選択されていません" });
70	    }
71	
72	    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
73	    res.json({
74	      success: true,
75	      urls: imageUrls,
76	      filenames: req.files.map((f) => f.filename),
77	    });
78	  } catch (error) {
79	    console.error("Images upload error:", error);
80	    res.status(500).json({ error: "画像のアップロードに失敗しました" });
81	  }
82	});
83	
84	// Delete image
85	router.delete("/image/:filename", (req, res) => {
86	  try {
87	    const { filename } = req.params;
88	    const filePath = path.join(uploadsDir, filename);
89	
90	    if (fs.existsSync(filePath)) {
91	      fs.unlinkSync(filePath);
92	      res.json({ success: true, message: "画像を削除しました" });
93	    } else {
94	      res.status(404).json({ error: "画像が見つかりません" });
95	    }
96	  } catch (error) {
97	    console.error("Image delete error:", error);
98	    res.status(500).json({ error: "画像の削除に失敗しました" });
99	  }
100	});
101	
102	export default router;
103	
104	