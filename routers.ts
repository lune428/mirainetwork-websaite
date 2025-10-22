Text file: routers.ts
Latest content with line numbers:
1	import { COOKIE_NAME } from "@/const";
2	import { TRPCError } from "@trpc/server";
3	import { z } from "zod";
4	import { getSessionCookieOptions } from "./_core/cookies";
5	import { systemRouter } from "./_core/systemRouter";
6	import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
7	import * as db from "./db";
8	
9	export const appRouter = router({
10	  system: systemRouter,
11	
12	  auth: router({
13	    me: publicProcedure.query(opts => opts.ctx.user),
14	    logout: publicProcedure.mutation(({ ctx }) => {
15	      const cookieOptions = getSessionCookieOptions(ctx.req);
16	      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
17	      return {
18	        success: true,
19	      } as const;
20	    }),
21	  }),
22	
23	  announcements: router({
24	    list: publicProcedure
25	      .input(z.object({ facility: z.string().optional(), publishedOnly: z.boolean().optional() }).optional())
26	      .query(async ({ input }) => {
27	        const announcements = await db.getAnnouncements(input?.facility, input?.publishedOnly ?? true);
28	        return announcements.sort((a, b) => {
29	          const dateA = a.publishedAt || a.createdAt;
30	          const dateB = b.publishedAt || b.createdAt;
31	          return dateB.getTime() - dateA.getTime();
32	        });
33	      }),
34	
35	    create: protectedProcedure
36	      .input(
37	        z.object({
38	          title: z.string().min(1).max(255),
39	          content: z.string().min(1),
40	          facility: z.enum(["organization", "mirai", "hikari", "studio_m"]),
41	          isPublished: z.enum(["draft", "published"]).optional(),
42	          publishedAt: z.date().optional(),
43	          imageUrls: z.array(z.string()).optional(),
44	        })
45	      )
46	      .mutation(async ({ ctx, input }) => {
47	        // Check permission: admin can create for any facility, facility managers can only create for their facility
48	        if (ctx.user.role !== "admin") {
49	          throw new TRPCError({ code: "FORBIDDEN", message: "Only administrators can create announcements" });
50	        }
51	
52	        const id = await db.createAnnouncement({
53	          title: input.title,
54	          content: input.content,
55	          facility: input.facility,
56	          authorId: ctx.user.id,
57	          isPublished: input.isPublished || "draft",
58	          publishedAt: input.publishedAt,
59	          imageUrls: input.imageUrls,
60	        });
61	
62	        return { id };
63	      }),
64	
65	    update: protectedProcedure
66	      .input(
67	        z.object({
68	          id: z.string(),
69	          title: z.string().min(1).max(255).optional(),
70	          content: z.string().min(1).optional(),
71	          facility: z.enum(["organization", "mirai", "hikari", "studio_m"]).optional(),
72	          isPublished: z.enum(["draft", "published"]).optional(),
73	          publishedAt: z.date().optional(),
74	          imageUrls: z.array(z.string()).optional(),
75	        })
76	      )
77	      .mutation(async ({ ctx, input }) => {
78	        const announcement = await db.getAnnouncementById(input.id);
79	        if (!announcement) {
80	          throw new TRPCError({ code: "NOT_FOUND", message: "Announcement not found" });
81	        }
82	
83	        // Check permission
84	        if (ctx.user.role !== "admin" && announcement.authorId !== ctx.user.id) {
85	          throw new TRPCError({ code: "FORBIDDEN", message: "You can only edit your own announcements" });
86	        }
87	
88	        await db.updateAnnouncement(input.id, {
89	          title: input.title,
90	          content: input.content,
91	          facility: input.facility,
92	          isPublished: input.isPublished,
93	          publishedAt: input.publishedAt,
94	          imageUrls: input.imageUrls as any,
95	        });
96	
97	        return { success: true };
98	      }),
99	
100	    delete: protectedProcedure
101	      .input(z.object({ id: z.string() }))
102	      .mutation(async ({ ctx, input }) => {
103	        const announcement = await db.getAnnouncementById(input.id);
104	        if (!announcement) {
105	          throw new TRPCError({ code: "NOT_FOUND", message: "Announcement not found" });
106	        }
107	
108	        // Check permission
109	        if (ctx.user.role !== "admin" && announcement.authorId !== ctx.user.id) {
110	          throw new TRPCError({ code: "FORBIDDEN", message: "You can only delete your own announcements" });
111	        }
112	
113	        await db.deleteAnnouncement(input.id);
114	
115	        return { success: true };
116	      }),
117	  }),
118	});
119	
120	export type AppRouter = typeof appRouter;
121	
122	