Text file: developers.facebook.com_docs_instagram-platform_reference_instagram-media_.md
Latest content with line numbers:
2	
3	**URL:** https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/
4	
5	---
6	
7	Docs
8	Tools
9	Support
10	Log In
11	Docs
12	Instagram Platform
13	API Reference
14	IG Media
15	Instagram Platform
16	Overview
17	Webhooks
18	Create an App
19	Instagram API with Instagram Login
20	Instagram API with Facebook Login
21	Publish Content
22	Comment Moderation
23	Private Replies
24	Insights
25	Sharing to Feed
26	Sharing to Stories
27	oEmbed
28	Embed Button
29	API Reference
30	Error Codes
31	Access Token
32	IG Comment
33	IG Container
34	IG Hashtag Search
35	IG Hashtag
36	IG Media
37	Children
38	Collaborators
39	Comments
40	Insights
41	Product Tags
42	IG User
43	/me
44	Oauth Authorize
45	Page
46	Refresh Access Token
47	App Review
48	Support
49	Changelog
50	On This Page
51	IG Media
52	
53	Represents an Instagram album, photo, or video (uploaded video, live video, reel, or story).
54	
55	If you are migrating from Marketing API Instagram Ads endpoints to Instagram Platform endpoints, be aware that some field names are different.
56	
57	Introducing the following field:
58	
59	legacy_instagram_media_id
60	
61	The following Marketing API Instagram Ads endpoint fields are not supported:
62	
63	filter_name
64	location
65	location_name
66	latitude
67	longitude
68	Creating
69	
70	This operation is not supported.
71	
72	Reading
73	
74	GET /<IG_MEDIA_ID>
75	
76	Gets fields and edges on Instagram media.
77	
78	Requirements
79		Instagram API with Instagram Login	Instagram API with Facebook Login
80	
81	
82	Access Tokens
83	
84		
85	Instagram User access token
86		
87	Facebook User access token
88	
89	
90	
91	Host URL
92	
93		
94	
95	graph.instagram.com
96	
97		
98	
99	graph.facebook.com
100	
101	
102	
103	
104	Login Type
105	
106		
107	
108	Business Login for Instagram
109	
110		
111	
112	Facebook Login for Business
113	
114	
115	Permissions	
116	instagram_business_basic
117		
118	instagram_basic
119	pages_read_engagement
120	
121	If the app user was granted a role via the Business Manager on the Page connected to your app user's Instagram professional account, your app will also need one of:
122	
123	ads_management
124	ads_read
125	Limitations
126	Fields that return aggregated values don't include ads-driven data. For example, comments_count returns the number of comments on a photo, but not comments on ads that contain that photo.
127	Captions don't include the @ symbol unless the app user is also able to perform admin-equivalent tasks on the app.
128	Some fields, such as permalink, cannot be used on photos within albums (children).
129	Live video Instagram Media can only be read while they are being broadcast.
130	This API returns only data for media owned by Instagram professional accounts. It can not be used to get data for media owned by personal Instagram accounts.
131	Request Syntax
132	GET https://<HOST_URL>/<API_VERSION>/<IG_MEDIA_ID> \
133	  ?fields=<LIST_OF_FIELDS> \
134	  &access_token=<ACCESS_TOKEN>
135	Path Parameters
136	Placeholder	Value
137	
138	
139	<API_VERSION>
140	
141	The latest version is:
142	
143	 v24.0	
144	
145	The API version your app is using. If not specified in your API calls this will be the latest version at the time you created your Meta app or, if that version is no longer available, the oldest version available.Learn more about versioning.
146	
147	
148	
149	
150	<HOST_URL>
151	
152		
153	
154	The host URL your app is using to query the endpoint.
155	
156	
157	
158	
159	<IG_MEDIA_ID>
160	
161		
162	
163	Required. ID for the media to be published.
164	
165	Query String Parameters
166	Key	Placeholder	Value
167	
168	
169	access_token
170	
171		
172	
173	<ACCESS_TOKEN>
174	
175		
176	
177	Required. The app user's Facebook or Instagram User access token.
178	
179	
180	
181	
182	fields
183	
184		
185	
186	<LIST_OF_FIELDS>
187	
188		
189	
190	Comma-separated list of fields you want returned.
191	
192	Fields
193	
194	Public fields can be read via field expansion.
195	
196	Field	Description
197	
198	
199	alt_text
200	Public