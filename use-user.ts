import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  facility: string | null;
}

export function useUser() {
  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}

