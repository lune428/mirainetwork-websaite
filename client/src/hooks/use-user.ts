import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  facility?: string;
}

export function useUser() {
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          return null;
        }
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return {
    user,
    loading: isLoading,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}

