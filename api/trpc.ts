import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import type { Context } from "../server/_core/trpc";
import { COOKIE_NAME } from "../shared/const";
// import { getUser } from "../server/db";
import * as cookie from "cookie";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create context for tRPC
const createContext = async ({
  req,
  res,
}: {
  req: any;
  res: any;
}): Promise<Context> => {
  const cookieHeader = req.headers?.cookie || req.get?.('cookie') || "";
  const cookies = cookie.parse(cookieHeader);
  const sessionId = cookies[COOKIE_NAME];
  
  let user = undefined;
// TODO: Implement simple session management if needed
// For now, authentication is handled by api/admin.ts and api/auth.ts
  return {
    req,
    res,
    user,
  };
};

// tRPC endpoint
app.use(
  "/",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Export as Vercel serverless function
export default async (req: VercelRequest, res: VercelResponse) => {
  // Convert VercelRequest to Express Request
  const expressReq = req as any;
  const expressRes = res as any;
  
  return app(expressReq, expressRes);
};

