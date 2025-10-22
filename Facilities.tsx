Text file: Facilities.tsx
Latest content with line numbers:
1	import { Link } from "wouter";
2	import { Button } from "@/components/ui/button";
3	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
4	import { Building2, Heart, Users, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
5	import { FACILITIES } from "@shared/const";
6	
7	export default function Facilities() {
8	  return (
9	    <div className="py-16 gradient-bg min-h-screen">
10	      <div className="container">
11	        {/* Page Header */}
12	        <div className="text-center mb-12">
13	          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">運営事業所</h1>
14	          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
15	          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
16	            3つの事業所で、それぞれの特色を活かした支援を提供しています。
17	            各事業所の詳細をご覧いただき、お気軽にお問い合わせください。
18	          </p>
19	        </div>
20	
21	        {/* Facilities Grid */}
22	        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
23	          {/* MIRAI Card */}
24	          <Card className="facility-mirai border-2 hover:shadow-xl transition-all">
25	            <CardHeader>
26	              <div className="w-16 h-16 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--facility-bg)' }}>
27	                <Building2 size={32} style={{ color: 'var(--facility-color)' }} />
28	              </div>
29	              <CardTitle className="text-2xl">{FACILITIES.mirai.name}</CardTitle>
30	              <CardDescription className="text-base">{FACILITIES.mirai.fullName}</CardDescription>
31	            </CardHeader>
32	            <CardContent>
33	              <p className="text-gray-700 mb-6 leading-relaxed">{FACILITIES.mirai.description}</p>
34	              
35	              <div className="space-y-3 mb-6">
36	                <div className="flex items-start gap-3">
37	                  <MapPin size={18} className="mt-1 flex-shrink-0 text-gray-500" />
38	                  <p className="text-sm">{FACILITIES.mirai.address}</p>
39	                </div>
40	                <div className="flex items-center gap-3">
41	                  <Phone size={18} className="flex-shrink-0 text-gray-500" />
42	                  <div className="text-sm">
43	                    <p>Tel: {FACILITIES.mirai.tel}</p>
44	                    <p>Fax: {FACILITIES.mirai.fax}</p>
45	                  </div>
46	                </div>
47	                <div className="flex items-center gap-3">
48	                  <Mail size={18} className="flex-shrink-0 text-gray-500" />
49	                  <p className="text-sm">{FACILITIES.mirai.email}</p>
50	                </div>
51	              </div>
52	
53	              <div className="space-y-4">
54	                <div className="bg-white/50 p-4 rounded-lg">
55	                  <h4 className="font-semibold mb-2">主な作業内容</h4>
56	                  <ul className="text-sm text-gray-700 space-y-1">
57	                    <li>• 缶バッジ作業</li>
58	                    <li>• ナフキン検品</li>
59	                    <li>• 古本回収・販売</li>
60	                    <li>• 小物製作</li>
61	                  </ul>
62	                </div>
63	                
64	                <Link href="/facilities/mirai">
65	                  <Button className="w-full" size="lg">
66	                    詳しく見る <ChevronRight size={18} className="ml-1" />
67	                  </Button>
68	                </Link>
69	              </div>
70	            </CardContent>
71	          </Card>
72	
73	          {/* HIKARI Card */}
74	          <Card className="facility-hikari border-2 hover:shadow-xl transition-all">
75	            <CardHeader>
76	              <div className="w-16 h-16 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--facility-bg)' }}>
77	                <Heart size={32} style={{ color: 'var(--facility-color)' }} />
78	              </div>
79	              <CardTitle className="text-2xl">{FACILITIES.hikari.name}</CardTitle>
80	              <CardDescription className="text-base">{FACILITIES.hikari.fullName}</CardDescription>
81	            </CardHeader>
82	            <CardContent>
83	              <p className="text-gray-700 mb-6 leading-relaxed">{FACILITIES.hikari.description}</p>
84	              
85	              <div className="space-y-3 mb-6">
86	                <div className="flex items-start gap-3">
87	                  <MapPin size={18} className="mt-1 flex-shrink-0 text-gray-500" />
88	                  <p className="text-sm">{FACILITIES.hikari.address}</p>
89	                </div>
90	                <div className="flex items-center gap-3">
91	                  <Phone size={18} className="flex-shrink-0 text-gray-500" />
92	                  <div className="text-sm">
93	                    <p>Tel: {FACILITIES.hikari.tel}</p>
94	                    <p>Fax: {FACILITIES.hikari.fax}</p>
95	                  </div>
96	                </div>
97	                <div className="flex items-center gap-3">
98	                  <Mail size={18} className="flex-shrink-0 text-gray-500" />
99	                  <p className="text-sm">{FACILITIES.hikari.email}</p>
100	                </div>
101	              </div>
102	
103	              <div className="space-y-4">
104	                <div className="bg-white/50 p-4 rounded-lg">
105	                  <h4 className="font-semibold mb-2">基本情報</h4>
106	                  <ul className="text-sm text-gray-700 space-y-1">
107	                    <li>• 定員: 20名</li>
108	                    <li>• 開所時間: 9:30～15:30</li>
109	                    <li>• 昭島市内送迎対応</li>
110	                    <li>• 昼食提供サービスあり</li>
111	                  </ul>
112	                </div>
113	                
114	                <Link href="/facilities/hikari">
115	                  <Button className="w-full" size="lg">
116	                    詳しく見る <ChevronRight size={18} className="ml-1" />
117	                  </Button>
118	                </Link>
119	              </div>
120	            </CardContent>
121	          </Card>
122	
123	          {/* studio M Card */}
124	          <Card className="facility-studio-m border-2 hover:shadow-xl transition-all">
125	            <CardHeader>
126	              <div className="w-16 h-16 rounded-lg mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--facility-bg)' }}>
127	                <Users size={32} style={{ color: 'var(--facility-color)' }} />
128	              </div>
129	              <CardTitle className="text-2xl">{FACILITIES.studio_m.name}</CardTitle>
130	              <CardDescription className="text-base">{FACILITIES.studio_m.fullName}</CardDescription>
131	            </CardHeader>
132	            <CardContent>
133	              <p className="text-gray-700 mb-6 leading-relaxed">{FACILITIES.studio_m.description}</p>
134	              
135	              <div className="space-y-3 mb-6">
136	                <div className="flex items-start gap-3">
137	                  <MapPin size={18} className="mt-1 flex-shrink-0 text-gray-500" />
138	                  <p className="text-sm">{FACILITIES.studio_m.address}</p>
139	                </div>
140	                <div className="flex items-center gap-3">
141	                  <Phone size={18} className="flex-shrink-0 text-gray-500" />
142	                  <div className="text-sm">
143	                    <p>Tel: {FACILITIES.studio_m.tel}</p>
144	                    <p>Fax: {FACILITIES.studio_m.fax}</p>
145	                  </div>
146	                </div>
147	                <div className="flex items-center gap-3">
148	                  <Mail size={18} className="flex-shrink-0 text-gray-500" />
149	                  <p className="text-sm">{FACILITIES.studio_m.email}</p>
150	                </div>
151	              </div>
152	
153	              <div className="space-y-4">
154	                <div className="bg-white/50 p-4 rounded-lg">
155	                  <h4 className="font-semibold mb-2">基本情報</h4>
156	                  <ul className="text-sm text-gray-700 space-y-1">
157	                    <li>• 定員: 20名</li>
158	                    <li>• 開所時間: 9:30～15:30</li>
159	                    <li>• 昭島市内送迎対応</li>
160	                    <li>• 昼食提供サービスあり</li>
161	                  </ul>
162	                </div>
163	                
164	                <Link href="/facilities/studio-m">
165	                  <Button className="w-full" size="lg">
166	                    詳しく見る <ChevronRight size={18} className="ml-1" />
167	                  </Button>
168	                </Link>
169	              </div>
170	            </CardContent>
171	          </Card>
172	        </div>
173	
174	        {/* Common Information */}
175	        <div className="max-w-4xl mx-auto mt-12">
176	          <Card>
177	            <CardHeader>
178	              <CardTitle className="text-center">共通サービス</CardTitle>
179	            </CardHeader>
180	            <CardContent>
181	              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
182	                <div>
183	                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
184	                    <Users size={24} className="text-blue-600" />
185	                  </div>
186	                  <h4 className="font-semibold mb-2">送迎サービス</h4>
187	                  <p className="text-sm text-gray-600">昭島市内の送迎に対応しています</p>
188	                </div>
189	                <div>
190	                  <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-3">
191	                    <Heart size={24} className="text-cyan-600" />
192	                  </div>
193	                  <h4 className="font-semibold mb-2">昼食提供</h4>
194	                  <p className="text-sm text-gray-600">1食200円で提供しています</p>
195	                </div>
196	                <div>
197	                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
198	                    <Building2 size={24} className="text-teal-600" />
199	                  </div>
200	                  <h4 className="font-semibold mb-2">見学・体験</h4>
201	                  <p className="text-sm text-gray-600">随時受け付けております</p>
202	                </div>
203	              </div>
204	            </CardContent>
205	          </Card>
206	        </div>
207	      </div>
208	    </div>
209	  );
210	}
211	
212	