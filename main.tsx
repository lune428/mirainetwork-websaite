Text file: main.tsx
Latest content with line numbers:
1	import { trpc } from "@/lib/trpc";
2	import { UNAUTHED_ERR_MSG } from '@shared/const';
3	import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
4	import { httpBatchLink, TRPCClientError } from "@trpc/client";
5	import { createRoot } from "react-dom/client";
6	import superjson from "superjson";
7	import App from "./App";
8	import { getLoginUrl } from "./const";
9	import "./index.css";
10	
11	const queryClient = new QueryClient();
12	
13	const redirectToLoginIfUnauthorized = (error: unknown) => {
14	  if (!(error instanceof TRPCClientError)) return;
15	  if (typeof window === "undefined") return;
16	
17	  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;
18	
19	  if (!isUnauthorized) return;
20	
21	  window.location.href = getLoginUrl();
22	};
23	
24	queryClient.getQueryCache().subscribe(event => {
25	  if (event.type === "updated" && event.action.type === "error") {
26	    const error = event.query.state.error;
27	    redirectToLoginIfUnauthorized(error);
28	    console.error("[API Query Error]", error);
29	  }
30	});
31	
32	queryClient.getMutationCache().subscribe(event => {
33	  if (event.type === "updated" && event.action.type === "error") {
34	    const error = event.mutation.state.error;
35	    redirectToLoginIfUnauthorized(error);
36	    console.error("[API Mutation Error]", error);
37	  }
38	});
39	
40	const trpcClient = trpc.createClient({
41	  links: [
42	    httpBatchLink({
43	      url: "/api/trpc",
44	      transformer: superjson,
45	      fetch(input, init) {
46	        return globalThis.fetch(input, {
47	          ...(init ?? {}),
48	          credentials: "include",
49	        });
50	      },
51	    }),
52	  ],
53	});
54	
55	createRoot(document.getElementById("root")!).render(
56	  <trpc.Provider client={trpcClient} queryClient={queryClient}>
57	    <QueryClientProvider client={queryClient}>
58	      <App />
59	    </QueryClientProvider>
60	  </trpc.Provider>
61	);
62	