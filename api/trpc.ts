import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import type { Context } from "../server/_core/trpc";
import { COOKIE_NAME } from "../shared/const";
import { getUser } from "../server/db";
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
  req: express.Request;
  res: express.Response;
}): Promise<Context> => {
  const cookies = cookie.parse((req.headers as any).cookie || "");
  const sessionId = cookies[COOKIE_NAME];
  
  let user = undefined;
  if (sessionId) {
    user = await getUser(sessionId);
  }

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

