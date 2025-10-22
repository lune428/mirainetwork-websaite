Text file: StudioM.tsx
Latest content with line numbers:
2	import { Button } from "@/components/ui/button";
3	import { Card, CardContent } from "@/components/ui/card";
4	import { Building2, Clock, Users, MapPin, Phone, Mail, Calendar, Utensils, Bus, Palette, Lightbulb, Sparkles } from "lucide-react";
5	import { Link } from "wouter";
6	import InstagramCarousel from "@/components/InstagramCarousel";
7	
8	export default function StudioM() {
9	  const basicInfo = [
10	    { icon: Users, label: "定員", value: "20名" },
11	    { icon: Clock, label: "開所時間", value: "9時30分～15時30分" },
12	    { icon: Calendar, label: "開所日", value: "平日（月1回程度祝日開所日あり）" },
13	    { icon: Calendar, label: "休日", value: "土・日・祝（開所日あり）、年末年始" },
14	    { icon: Bus, label: "交通", value: "昭島市内送迎対応（ご相談下さい）\n交通費支給あり（1日上限500円）" },
15	    { icon: Utensils, label: "昼食", value: "基本提供サービスあります\n1食200円です" },
16	  ];
17	
18	  const features = [
19	    {
20	      icon: Palette,
21	      title: "創造的な活動",
22	      description: "アート、クラフト、デザインなど、創造性を活かした様々な活動を通じて、利用者様の個性と才能を引き出します。"
23	    },
24	    {
25	      icon: Lightbulb,
26	      title: "スキル習得",
27	      description: "各種作業を通じて実践的なスキルを身につけ、将来の就労に向けた準備をサポートします。"
28	    },
29	    {
30	      icon: Sparkles,
31	      title: "自己表現",
32	      description: "制作活動を通じて自己表現の機会を提供し、達成感と自信を育みます。"
33	    },
34	  ];
35	
36	  return (
37	    <div className="min-h-screen flex flex-col">
38	      {/* Header */}
39	      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
40	        <div className="container py-4">
41	          <div className="flex items-center justify-between">
42	            <Link href="/">
43	              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
44	                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center p-1">
45	                  <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain" />
46	                </div>
47	                <div>
48	                  <h1 className="text-xl font-bold text-foreground">一般社団法人未来ネットワーク</h1>
49	                  <p className="text-sm text-muted-foreground">障害福祉サービス</p>
50	                </div>
51	              </a>
52	            </Link>
53	            <nav className="hidden md:flex gap-6">
54	              <Link href="/">
55	                <a className="text-sm font-medium hover:text-primary transition-colors">ホーム</a>
56	              </Link>
57	              <Link href="/mirai">
58	                <a className="text-sm font-medium hover:text-primary transition-colors">MIRAI</a>
59	              </Link>
60	              <Link href="/hikari">
61	                <a className="text-sm font-medium hover:text-primary transition-colors">HIKARI</a>
62	              </Link>
63	              <Link href="/studio-m">
64	                <a className="text-sm font-medium text-primary">studio M</a>
65	              </Link>
66	            </nav>
67	          </div>
68	        </div>
69	      </header>
70	
71	      {/* Hero Section with Banner Image */}
72	      <section className="relative">
73	        <div className="w-full h-64 md:h-96 overflow-hidden">
74	          <img src="/studio-m-main.webp" alt="studio M" className="w-full h-full object-cover" />
75	        </div>
76	        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-center justify-center">
77	          <div className="text-center text-white">
78	            <h2 className="text-4xl md:text-5xl font-bold mb-2">studio M</h2>
79	            <p className="text-xl font-semibold">就労継続支援B型事業所</p>
80	          </div>