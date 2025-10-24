import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { ENV } from "./env";
import type { Context } from "./trpc";
import { COOKIE_NAME } from "../../shared/const";
// import { getUser } from "../db"; // Removed for now
import * as cookie from "cookie";
import cors from "cors";

const app = express();

// CORS for development
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

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
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionId = cookies[COOKIE_NAME];
  
  let user = undefined;
  // TODO: Implement user authentication
  // if (sessionId) {
  //   user = await getUser(sessionId);
  // }

  return {
    req,
    res,
    user,
  };
};

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

app.listen(port, () => {
  console.log(`API Server running on http://localhost:${port}`);
});

