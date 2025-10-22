import type { Request } from "express";
import type { CookieOptions } from "express";

export function getSessionCookieOptions(req: Request): CookieOptions {
  const isProduction = process.env.NODE_ENV === "production";
  
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/",
  };
}

