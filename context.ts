Text file: context.ts
Latest content with line numbers:
1	import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
2	import type { User } from "../../drizzle/schema";
3	import { sdk } from "./sdk";
4	
5	export type TrpcContext = {
6	  req: CreateExpressContextOptions["req"];
7	  res: CreateExpressContextOptions["res"];
8	  user: User | null;
9	};
10	
11	export async function createContext(
12	  opts: CreateExpressContextOptions
13	): Promise<TrpcContext> {
14	  let user: User | null = null;
15	
16	  try {
17	    user = await sdk.authenticateRequest(opts.req);
18	  } catch (error) {
19	    // Authentication is optional for public procedures.
20	    user = null;
21	  }
22	
23	  return {
24	    req: opts.req,
25	    res: opts.res,
26	    user,
27	  };
28	}
29	