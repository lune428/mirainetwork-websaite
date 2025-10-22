import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import session from "express-session";
import authRouter from "../server/routes/auth";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mirai-network-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Auth routes
app.use("/", authRouter);

// Export as Vercel serverless function
export default async (req: VercelRequest, res: VercelResponse) => {
  // Convert VercelRequest to Express Request
  const expressReq = req as any;
  const expressRes = res as any;
  
  return app(expressReq, expressRes);
};

