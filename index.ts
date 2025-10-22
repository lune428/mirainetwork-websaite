Text file: index.ts
Latest content with line numbers:
2	import express from "express";
3	import { createServer } from "http";
4	import net from "net";
5	import session from "express-session";
6	import { createExpressMiddleware } from "@trpc/server/adapters/express";
7	import { registerOAuthRoutes } from "./oauth";
8	import { appRouter } from "../routers";
9	import { createContext } from "./context";
10	import announcementsRouter from "../routes/announcements";
11	import adminRouter from "../routes/admin";
12	import authRouter from "../routes/auth";
13	import uploadRouter from "../routes/upload";
14	import contactRouter from "../routes/contact";
15	import { registerJobPostingsRoutes } from "../routes/job-postings";
16	import { registerBenefitsRoutes } from "../routes/benefits";
17	import { serveStatic, setupVite } from "./vite";
18	
19	function isPortAvailable(port: number): Promise<boolean> {
20	  return new Promise(resolve => {
21	    const server = net.createServer();
22	    server.listen(port, () => {
23	      server.close(() => resolve(true));
24	    });
25	    server.on("error", () => resolve(false));
26	  });
27	}
28	
29	async function findAvailablePort(startPort: number = 3000): Promise<number> {
30	  for (let port = startPort; port < startPort + 20; port++) {
31	    if (await isPortAvailable(port)) {
32	      return port;
33	    }
34	  }
35	  throw new Error(`No available port found starting from ${startPort}`);
36	}
37	
38	async function startServer() {
39	  const app = express();
40	  const server = createServer(app);
41	  // Configure body parser with larger size limit for file uploads
42	  app.use(express.json({ limit: "50mb" }));
43	  app.use(express.urlencoded({ limit: "50mb", extended: true }));
44	  
45	  // Serve static files from public/uploads directory
46	  app.use("/uploads", express.static("public/uploads"));
47	  
48	  // Session middleware
49	  app.use(
50	    session({
51	      secret: process.env.SESSION_SECRET || "mirai-network-secret-key-change-in-production",
52	      resave: false,
53	      saveUninitialized: false,
54	      cookie: {
55	        secure: process.env.NODE_ENV === "production",
56	        httpOnly: true,
57	        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
58	      },
59	    })
60	  );
61	  // OAuth callback under /api/oauth/callback
62	  registerOAuthRoutes(app);
63	  // REST API routes
64	  app.use("/api/auth", authRouter);
65	  app.use("/api/announcements", announcementsRouter);
66	  app.use("/api/admin", adminRouter);
67	  app.use("/api/upload", uploadRouter);
68	  app.use("/api/contact", contactRouter);
69	  registerJobPostingsRoutes(app);
70	  registerBenefitsRoutes(app);
71	  // tRPC API
72	  app.use(
73	    "/api/trpc",
74	    createExpressMiddleware({
75	      router: appRouter,
76	      createContext,
77	    })
78	  );
79	  // development mode uses Vite, production mode uses static files
80	  if (process.env.NODE_ENV === "development") {
81	    await setupVite(app, server);
82	  } else {
83	    serveStatic(app);
84	  }
85	
86	  const preferredPort = parseInt(process.env.PORT || "3000");
87	  const port = await findAvailablePort(preferredPort);
88	
89	  if (port !== preferredPort) {
90	    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
91	  }
92	
93	  server.listen(port, () => {
94	    console.log(`Server running on http://localhost:${port}/`);
95	  });
96	}
97	
98	startServer().catch(console.error);
99	