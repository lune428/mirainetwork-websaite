import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { users } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export type FacilityType = "organization" | "mirai" | "hikari" | "studio_m";
export type UserRole = "user" | "admin" | "mirai_admin" | "hikari_admin" | "studio_m_admin";

/**
 * Check if user has permission to access/edit a specific facility's content
 */
export function canAccessFacility(userRole: UserRole, userFacility: FacilityType | null, targetFacility: FacilityType): boolean {
  // Admin can access everything
  if (userRole === "admin") {
    return true;
  }

  // Organization-wide content can be accessed by admin only
  if (targetFacility === "organization") {
    return userRole === "admin";
  }

  // Facility-specific admins can only access their own facility
  if (userRole === "mirai_admin" && userFacility === "mirai") {
    return targetFacility === "mirai";
  }

  if (userRole === "hikari_admin" && userFacility === "hikari") {
    return targetFacility === "hikari";
  }

  if (userRole === "studio_m_admin" && userFacility === "studio_m") {
    return targetFacility === "studio_m";
  }

  return false;
}

/**
 * Get list of facilities that user can access
 */
export function getAccessibleFacilities(userRole: UserRole, userFacility: FacilityType | null): FacilityType[] {
  if (userRole === "admin") {
    return ["organization", "mirai", "hikari", "studio_m"];
  }

  if (userRole === "mirai_admin" && userFacility === "mirai") {
    return ["mirai"];
  }

  if (userRole === "hikari_admin" && userFacility === "hikari") {
    return ["hikari"];
  }

  if (userRole === "studio_m_admin" && userFacility === "studio_m") {
    return ["studio_m"];
  }

  return [];
}

/**
 * Middleware to check if user is authenticated
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: "認証が必要です" });
  }
  next();
}

/**
 * Middleware to check if user has admin role (any admin)
 */
export function requireAnyAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: "認証が必要です" });
  }

  const role = req.user.role as UserRole;
  const isAdmin = role === "admin" || role === "mirai_admin" || role === "hikari_admin" || role === "studio_m_admin";

  if (!isAdmin) {
    return res.status(403).json({ error: "管理者権限が必要です" });
  }

  next();
}

/**
 * Middleware to check if user can access specific facility
 */
export function requireFacilityAccess(facility: FacilityType) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "認証が必要です" });
    }

    const userRole = req.user.role as UserRole;
    const userFacility = req.user.facility as FacilityType | null;

    if (!canAccessFacility(userRole, userFacility, facility)) {
      return res.status(403).json({ error: "この事業所へのアクセス権限がありません" });
    }

    next();
  };
}

/**
 * Middleware to validate facility parameter and check access
 */
export function validateAndCheckFacilityAccess(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: "認証が必要です" });
  }

  const facility = req.params.facility || req.body.facility;
  
  if (!facility) {
    return res.status(400).json({ error: "事業所が指定されていません" });
  }

  const validFacilities: FacilityType[] = ["organization", "mirai", "hikari", "studio_m"];
  if (!validFacilities.includes(facility)) {
    return res.status(400).json({ error: "無効な事業所です" });
  }

  const userRole = req.user.role as UserRole;
  const userFacility = req.user.facility as FacilityType | null;

  if (!canAccessFacility(userRole, userFacility, facility)) {
    return res.status(403).json({ error: "この事業所へのアクセス権限がありません" });
  }

  next();
}

