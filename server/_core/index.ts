import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import ViteExpress from "vite-express";
import session from "express-session";
import { appRouter } from "../routers";
import { ENV } from "./env";
import type { Context } from "./trpc";
import { COOKIE_NAME } from "../../shared/const";
import { getUser } from "../db";
import * as cookie from "cookie";
import authRouter from "../routes/auth";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: ENV.sessionSecret || "mirai-network-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: ENV.nodeEnv === "production",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: ENV.nodeEnv === "production" ? "none" : "lax",
    },
  })
);

// Create context for tRPC
const createContext = async ({
  req,
  res,
}: {
  req: express.Request;
  res: express.Response;
}): Promise<Context> => {
  const cookies = cookie.parse(req.headers.cookie || "");
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

// Auth routes (Express router)
app.use("/api/auth", authRouter);

// tRPC endpoint
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Serve static files from client/public
app.use(express.static("client/public"));

// Start server
const port = ENV.port;

if (ENV.nodeEnv === "production") {
  // Production mode: serve built files
  app.use(express.static("dist/public"));
  
  // Serve index.html for all other routes (SPA)
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "dist/public" });
  });
  
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
} else {
  // Development mode: use Vite dev server
  ViteExpress.listen(app, port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

