Text file: Admin.tsx
Latest content with line numbers:
1	import { useUser } from "@/hooks/use-user";
2	import { useQuery } from "@tanstack/react-query";
3	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
4	import { Button } from "@/components/ui/button";
5	import { Badge } from "@/components/ui/badge";
6	import { Link, useLocation } from "wouter";
7	import { 
8	  Bell, 
9	  FileText, 
10	  Users, 
11	  CheckCircle, 
12	  Clock, 
13	  XCircle,
14	  Plus,
15	  Settings,
16	  LayoutDashboard,
17	  Briefcase,
18	  Gift
19	} from "lucide-react";
20	import Header from "@/components/Header";
21	
22	interface DashboardStats {
23	  totalAnnouncements: number;
24	  pendingApproval: number;
25	  published: number;
26	  draft: number;
27	}
28	
29	export default function Admin() {
30	  const { user, isAuthenticated, loading } = useUser();
31	  const [, setLocation] = useLocation();
32	
33	  const { data: stats } = useQuery<DashboardStats>({
34	    queryKey: ["/api/admin/stats"],
35	    enabled: isAuthenticated,
36	  });
37	
38	  // Show loading state while checking authentication
39	  if (loading) {
40	    return (
41	      <div className="min-h-screen flex items-center justify-center bg-gray-50">
42	        <div className="text-center">
43	          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
44	          <p className="text-muted-foreground">読み込み中...</p>
45	        </div>
46	      </div>
47	    );
48	  }
49	
50	  if (!isAuthenticated) {
51	    setLocation("/login");
52	    return null;
53	  }
54	
55	  const isAdmin = user?.role === "admin";
56	  const isFacilityAdmin = user?.role?.includes("_admin");
57	
58	  if (!isAdmin && !isFacilityAdmin) {
59	    return (
60	      <div className="min-h-screen flex items-center justify-center bg-gray-50">
61	        <Card className="w-full max-w-md">
62	          <CardHeader>
63	            <CardTitle>アクセス権限がありません</CardTitle>
64	            <CardDescription>
65	              この画面にアクセスする権限がありません。
66	            </CardDescription>
67	          </CardHeader>
68	          <CardContent>
69	            <Button onClick={() => setLocation("/")} className="w-full">
70	              ホームに戻る
71	            </Button>
72	          </CardContent>
73	        </Card>
74	      </div>
75	    );
76	  }
77	
78	  return (
79	    <div className="min-h-screen flex flex-col bg-gray-50">
80	      <Header />
81	      
82	      <div className="container py-8">
83	        {/* Header */}
84	        <div className="mb-8">
85	          <h1 className="text-3xl font-bold mb-2">管理画面</h1>
86	          <p className="text-muted-foreground">
87	            {isAdmin ? "法人管理者" : "事業所管理者"} - {user?.name}
88	          </p>
89	        </div>
90	
91	        {/* Stats Cards */}
92	        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
93	          <Card>
94	            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
95	              <CardTitle className="text-sm font-medium">
96	                総お知らせ数
97	              </CardTitle>
98	              <FileText className="h-4 w-4 text-muted-foreground" />
99	            </CardHeader>
100	            <CardContent>
101	              <div className="text-2xl font-bold">{stats?.totalAnnouncements || 0}</div>
102	            </CardContent>
103	          </Card>
104	
105	          <Card>
106	            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
107	              <CardTitle className="text-sm font-medium">
108	                承認待ち
109	              </CardTitle>
110	              <Clock className="h-4 w-4 text-yellow-600" />
111	            </CardHeader>
112	            <CardContent>
113	              <div className="text-2xl font-bold text-yellow-600">
114	                {stats?.pendingApproval || 0}
115	              </div>
116	            </CardContent>
117	          </Card>
118	
119	          <Card>
120	            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
121	              <CardTitle className="text-sm font-medium">
122	                公開中
123	              </CardTitle>
124	              <CheckCircle className="h-4 w-4 text-green-600" />
125	            </CardHeader>
126	            <CardContent>
127	              <div className="text-2xl font-bold text-green-600">
128	                {stats?.published || 0}
129	              </div>
130	            </CardContent>
131	          </Card>
132	
133	          <Card>
134	            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
135	              <CardTitle className="text-sm font-medium">
136	                下書き
137	              </CardTitle>
138	              <FileText className="h-4 w-4 text-gray-600" />
139	            </CardHeader>
140	            <CardContent>
141	              <div className="text-2xl font-bold text-gray-600">
142	                {stats?.draft || 0}
143	              </div>
144	            </CardContent>
145	          </Card>
146	        </div>
147	
148	        {/* Quick Actions */}
149	        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
150	          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
151	            <Link href="/admin/announcements">
152	              <CardHeader>
153	                <div className="flex items-center gap-3">
154	                  <div className="p-3 bg-blue-100 rounded-lg">
155	                    <Bell className="h-6 w-6 text-blue-600" />
156	                  </div>
157	                  <div>
158	                    <CardTitle>お知らせ管理</CardTitle>
159	                    <CardDescription>
160	                      お知らせの作成・編集・承認
161	                    </CardDescription>
162	                  </div>
163	                </div>
164	              </CardHeader>
165	            </Link>
166	          </Card>
167	
168	          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
169	            <Link href="/admin/announcements/new">
170	              <CardHeader>
171	                <div className="flex items-center gap-3">
172	                  <div className="p-3 bg-green-100 rounded-lg">
173	                    <Plus className="h-6 w-6 text-green-600" />
174	                  </div>
175	                  <div>
176	                    <CardTitle>新規お知らせ作成</CardTitle>
177	                    <CardDescription>
178	                      新しいお知らせを投稿
179	                    </CardDescription>
180	                  </div>
181	                </div>
182	              </CardHeader>
183	            </Link>
184	          </Card>
185	
186	          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
187	            <Link href="/admin/job-postings">
188	              <CardHeader>
189	                <div className="flex items-center gap-3">
190	                  <div className="p-3 bg-orange-100 rounded-lg">
191	                    <Briefcase className="h-6 w-6 text-orange-600" />
192	                  </div>
193	                  <div>
194	                    <CardTitle>募集職種管理</CardTitle>
195	                    <CardDescription>
196	                      求人情報の作成・編集
197	                    </CardDescription>
198	                  </div>
199	                </div>
200	              </CardHeader>
201	            </Link>
202	          </Card>
203	
204	          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
205	            <Link href="/admin/benefits">
206	              <CardHeader>
207	                <div className="flex items-center gap-3">
208	                  <div className="p-3 bg-teal-100 rounded-lg">
209	                    <Gift className="h-6 w-6 text-teal-600" />
210	                  </div>
211	                  <div>
212	                    <CardTitle>福利厚生管理</CardTitle>
213	                    <CardDescription>
214	                      福利厚生・待遇の編集
215	                    </CardDescription>
216	                  </div>
217	                </div>
218	              </CardHeader>
219	            </Link>
220	          </Card>
221	
222	          {isAdmin && (
223	            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
224	              <Link href="/admin/users/register">
225	                <CardHeader>
226	                  <div className="flex items-center gap-3">
227	                    <div className="p-3 bg-purple-100 rounded-lg">
228	                      <Users className="h-6 w-6 text-purple-600" />
229	                    </div>
230	                    <div>
231	                      <CardTitle>ユーザー登録</CardTitle>
232	                      <CardDescription>
233	                        新しい管理者アカウントを作成
234	                      </CardDescription>
235	                    </div>
236	                  </div>
237	                </CardHeader>
238	              </Link>
239	            </Card>
240	          )}
241	        </div>
242	      </div>
243	    </div>
244	  );
245	}
246	
247	