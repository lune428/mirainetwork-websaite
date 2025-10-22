Text file: use-user.ts
Latest content with line numbers:
1	import { useQuery } from "@tanstack/react-query";
2	
3	export interface User {
4	  id: string;
5	  username: string;
6	  name?: string;
7	  email?: string;
8	  role?: "user" | "admin" | "mirai_admin" | "hikari_admin" | "studio_m_admin";
9	  facility?: "corporate" | "mirai" | "hikari" | "studio_m";
10	  openId?: string;
11	}
12	
13	async function fetchUser(): Promise<User | null> {
14	  try {
15	    const response = await fetch("/api/auth/me", {
16	      credentials: "include",
17	    });
18	
19	    if (!response.ok) {
20	      if (response.status === 401) {
21	        return null;
22	      }
23	      throw new Error(`Failed to fetch user: ${response.statusText}`);
24	    }
25	
26	    return response.json();
27	  } catch (error) {
28	    console.error("Error fetching user:", error);
29	    return null;
30	  }
31	}
32	
33	export function useUser() {
34	  const { data: user, isLoading, error, refetch } = useQuery<User | null>({
35	    queryKey: ["user"],
36	    queryFn: fetchUser,
37	    staleTime: 1000 * 60 * 5, // 5 minutes
38	    retry: false,
39	  });
40	
41	  return {
42	    user: user ?? null,
43	    loading: isLoading,
44	    error,
45	    isAuthenticated: !!user,
46	    refetch,
47	  };
48	}
49	
50	