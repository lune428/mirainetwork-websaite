import { trpc } from "@/lib/trpc";

export function useUser() {
  const { data: user, isLoading, error } = trpc.auth.me.useQuery();
  
  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
  };
}

