Text file: InstagramFeed.tsx
Latest content with line numbers:
1	import { useEffect } from 'react';
2	
3	interface InstagramFeedProps {
4	  username: string;
5	  title?: string;
6	  limit?: number;
7	}
8	
9	export default function InstagramFeed({ username, title, limit = 9 }: InstagramFeedProps) {
10	  useEffect(() => {
11	    // LightWidget スクリプトを動的に読み込む
12	    const script = document.createElement('script');
13	    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
14	    script.async = true;
15	    document.body.appendChild(script);
16	
17	    return () => {
18	      // クリーンアップ
19	      if (document.body.contains(script)) {
20	        document.body.removeChild(script);
21	      }
22	    };
23	  }, []);
24	
25	  return (
26	    <div className="w-full">
27	      {title && (
28	        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
29	      )}
30	      
31	      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-lg">
32	        <div className="flex flex-col items-center gap-6 mb-8">
33	          {/* Instagramアイコンとプロフィールリンク */}
34	          <div className="flex items-center gap-4">
35	            <svg 
36	              className="w-12 h-12 text-pink-600" 
37	              fill="currentColor" 
38	              viewBox="0 0 24 24"
39	              xmlns="http://www.w3.org/2000/svg"
40	            >
41	              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
42	            </svg>
43	            <div>
44	              <p className="text-lg font-semibold text-gray-900">@{username}</p>
45	              <p className="text-sm text-gray-600">最新の投稿</p>
46	            </div>
47	          </div>
48	
49	          {/* Instagramプロフィールへのリンクボタン */}
50	          <a
51	            href={`https://www.instagram.com/${username}/`}
52	            target="_blank"
53	            rel="noopener noreferrer"
54	            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
55	          >
56	            <svg 
57	              className="w-5 h-5" 
58	              fill="currentColor" 
59	              viewBox="0 0 24 24"
60	              xmlns="http://www.w3.org/2000/svg"
61	            >
62	              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
63	            </svg>
64	            Instagramをフォロー
65	          </a>
66	        </div>
67	
68	        {/* Instagram投稿グリッド - LightWidget使用 */}
69	        <div className="w-full max-w-4xl mx-auto">
70	          <iframe
71	            src={`https://cdn.lightwidget.com/widgets/${getWidgetId(username)}.html`}
72	            scrolling="no"
73	            className="lightwidget-widget w-full border-0"
74	            style={{ width: '100%', border: 0, overflow: 'hidden' }}
75	          ></iframe>
76	        </div>
77	
78	        {/* 代替方法: Instagram埋め込みグリッド（手動設定） */}
79	        <div className="mt-8 text-center">
80	          <p className="text-sm text-gray-600">
81	            日々の活動の様子や作品、イベント情報などをInstagramで発信しています。
82	            <br />
83	            ぜひフォローして最新情報をチェックしてください！
84	          </p>
85	        </div>
86	      </div>
87	    </div>
88	  );
89	}
90	
91	// ウィジェットIDを取得する関数（実際には各アカウントごとに設定が必要）
92	function getWidgetId(username: string): string {
93	  // LightWidgetで作成したウィジェットIDをここに設定
94	  // 例: studio.m2022 の場合のウィジェットID
95	  const widgetMap: Record<string, string> = {
96	    'studio.m2022': 'WIDGET_ID_HERE', // 実際のウィジェットIDに置き換える
97	  };
98	  
99	  return widgetMap[username] || '';
100	}
101	
102	