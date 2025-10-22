import { useQuery } from "@tanstack/react-query";

export interface User {
  id: number;
  username: string;
  openId?: string;
}

async function fetchUser(): Promise<User | null> {
  try {
    const response = await fetch("/api/user", {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export function useUser() {
  const { data: user, isLoading, error, refetch } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return {
    user: user ?? null,
    loading: isLoading,
    error,
    isAuthenticated: !!user,
    refetch,
  };
}

