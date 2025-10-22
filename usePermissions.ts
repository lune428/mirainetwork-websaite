import { useAuth } from "@/_core/hooks/useAuth";

export type FacilityType = "organization" | "mirai" | "hikari" | "studio_m";
export type UserRole = "user" | "admin" | "mirai_admin" | "hikari_admin" | "studio_m_admin";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  facility?: FacilityType | null;
}

export function usePermissions() {
  const { user } = useAuth();

  const canAccessFacility = (targetFacility: FacilityType): boolean => {
    if (!user) return false;

    const userRole = user.role as UserRole;
    const userFacility = (user as any).facility as FacilityType | null;

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
  };

  const getAccessibleFacilities = (): FacilityType[] => {
    if (!user) return [];

    const userRole = user.role as UserRole;
    const userFacility = (user as any).facility as FacilityType | null;

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
  };

  const isAdmin = (): boolean => {
    if (!user) return false;
    return user.role === "admin";
  };

  const isFacilityAdmin = (): boolean => {
    if (!user) return false;
    const userRole = user.role as UserRole;
    return userRole === "mirai_admin" || userRole === "hikari_admin" || userRole === "studio_m_admin";
  };

  const isAnyAdmin = (): boolean => {
    return isAdmin() || isFacilityAdmin();
  };

  return {
    user,
    canAccessFacility,
    getAccessibleFacilities,
    isAdmin,
    isFacilityAdmin,
    isAnyAdmin,
  };
}

