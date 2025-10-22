import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "../server/routes/auth";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth routes
app.use("/", authRouter);

// Export as Vercel serverless function
export default async (req: VercelRequest, res: VercelResponse) => {
  // Convert VercelRequest to Express Request
  const expressReq = req as any;
  const expressRes = res as any;
  
  return app(expressReq, expressRes);
};

