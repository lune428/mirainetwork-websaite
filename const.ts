Text file: const.ts
Latest content with line numbers:
1	export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
2	
3	export const APP_TITLE = typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_TITLE || "App";
4	
5	export const APP_LOGO =
6	  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_LOGO) ||
7	  "https://placehold.co/128x128/E1E7EF/1F2937?text=App";
8	
9	// Generate login URL at runtime so redirect URI reflects the current origin.
10	export const getLoginUrl = () => {
11	  const oauthPortalUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_OAUTH_PORTAL_URL;
12	  const appId = typeof import.meta !== 'undefined' && import.meta.env?.VITE_APP_ID;
13	  const redirectUri = `${window.location.origin}/api/oauth/callback`;
14	  const state = btoa(redirectUri);
15	
16	  const url = new URL(`${oauthPortalUrl}/app-auth`);
17	  url.searchParams.set("appId", appId);
18	  url.searchParams.set("redirectUri", redirectUri);
19	  url.searchParams.set("state", state);
20	  url.searchParams.set("type", "signIn");
21	
22	  return url.toString();
23	};