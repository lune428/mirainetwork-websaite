# 未来ネットワークWebサイト 動的デザイン提案書

## 参考サイト分析: Sky株式会社 SNSポータル

### 確認した動的デザイン要素

1. **背景のグラデーション＆パターン**
   - 青系のグラデーション背景
   - ドット・幾何学パターンのオーバーレイ
   - 斜めのラインエフェクト

2. **スマートフォンモックアップ**
   - 3D的な配置で画面を表示
   - 複数の画面が重なるレイアウト
   - 視覚的なインパクト

3. **SNS統計の表示**
   - フォロワー数の大きな表示
   - アイコン付きの視覚的な統計
   - カード型のレイアウト

4. **Instagram投稿グリッド**
   - 実際の投稿を埋め込み
   - ホバーエフェクト
   - レスポンシブグリッド

## 未来ネットワークサイトへの適用提案

### 1. ヒーローセクションの強化

**現状**: シンプルな背景画像とテキスト

**提案**: 
```tsx
// 動的な背景グラデーション + アニメーション
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* アニメーション背景 */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
    {/* 動くドットパターン */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float" 
           style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
      <div className="absolute w-3 h-3 bg-teal-400 rounded-full animate-float" 
           style={{ top: '60%', left: '80%', animationDelay: '2s' }}></div>
      {/* 他のドットも追加 */}
    </div>
  </div>
  
  {/* コンテンツ */}
  <div className="relative z-10">
    <h1 className="text-6xl font-bold animate-fade-in-up">
      一人ひとりの未来を共に創る
    </h1>
  </div>
</section>
```

### 2. 事業所カードのホバーエフェクト

**現状**: 基本的なホバーシャドウ

**提案**:
```tsx
<Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
  {/* 背景グラデーションオーバーレイ */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-teal-500/0 
                  group-hover:from-blue-500/10 group-hover:to-teal-500/10 
                  transition-all duration-300"></div>
  
  {/* 画像 */}
  <div className="relative overflow-hidden">
    <img className="w-full h-64 object-cover transition-transform duration-500 
                    group-hover:scale-110" 
         src={facility.image} alt={facility.name} />
    
    {/* ホバー時のオーバーレイ */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                    transition-all duration-300"></div>
  </div>
  
  {/* コンテンツ */}
  <CardContent className="relative z-10">
    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
      {facility.name}
    </h3>
  </CardContent>
</Card>
```

### 3. お知らせセクションのアニメーション

**提案**:
```tsx
// スクロールに応じて表示されるアニメーション
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {announcements.map((announcement, index) => (
    <div 
      key={announcement.id}
      className="opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <Card className="hover:shadow-xl transition-shadow duration-300">
        {/* カード内容 */}
      </Card>
    </div>
  ))}
</div>
```

### 4. 統計情報の視覚化

**提案**: 事業所の実績を数字で表示
```tsx
<section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
  <div className="container">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="text-center">
        <div className="text-5xl font-bold mb-2 animate-count-up">10</div>
        <div className="text-sm opacity-90">設立年数</div>
      </div>
      <div className="text-center">
        <div className="text-5xl font-bold mb-2 animate-count-up">3</div>
        <div className="text-sm opacity-90">運営事業所</div>
      </div>
      <div className="text-center">
        <div className="text-5xl font-bold mb-2 animate-count-up">50+</div>
        <div className="text-sm opacity-90">利用者様</div>
      </div>
      <div className="text-center">
        <div className="text-5xl font-bold mb-2 animate-count-up">30+</div>
        <div className="text-sm opacity-90">スタッフ</div>
      </div>
    </div>
  </div>
</section>
```

### 5. パララックス効果

**提案**: スクロールに応じて要素が異なる速度で動く
```tsx
<section className="relative py-32 overflow-hidden">
  {/* 背景レイヤー（遅く動く） */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ 
      backgroundImage: 'url(/hero-bg.jpg)',
      transform: `translateY(${scrollY * 0.5}px)` 
    }}
  ></div>
  
  {/* コンテンツレイヤー（通常速度） */}
  <div className="relative z-10 container">
    <h2 className="text-4xl font-bold">私たちの理念</h2>
  </div>
</section>
```

### 6. インタラクティブなタイムライン

**提案**: 法人の歴史をビジュアル化
```tsx
<div className="relative">
  {/* 縦線 */}
  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-teal-500"></div>
  
  {milestones.map((milestone, index) => (
    <div 
      key={index}
      className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* 年号 */}
      <div className="w-5/12 text-right pr-8">
        <div className="text-3xl font-bold text-primary">{milestone.year}</div>
      </div>
      
      {/* ドット */}
      <div className="w-2/12 flex justify-center">
        <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg 
                        hover:scale-150 transition-transform duration-300"></div>
      </div>
      
      {/* 内容 */}
      <div className="w-5/12 pl-8">
        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <h4 className="font-bold mb-2">{milestone.title}</h4>
            <p className="text-sm text-gray-600">{milestone.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  ))}
</div>
```

### 7. ローディングアニメーション

**提案**: ページ遷移時のスムーズな体験
```tsx
// ページローディング
<div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
  <div className="relative">
    {/* ロゴアニメーション */}
    <img 
      src="/mirai-logo.webp" 
      alt="未来ネットワーク" 
      className="w-24 h-24 animate-pulse"
    />
    
    {/* プログレスバー */}
    <div className="mt-4 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 
                      animate-progress"></div>
    </div>
  </div>
</div>
```

### 8. スクロールトリガーアニメーション

**提案**: 要素が画面に入ったときにアニメーション
```tsx
// Intersection Observer を使用
const [isVisible, setIsVisible] = useState(false);
const ref = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    },
    { threshold: 0.1 }
  );
  
  if (ref.current) {
    observer.observe(ref.current);
  }
  
  return () => observer.disconnect();
}, []);

return (
  <div 
    ref={ref}
    className={`transition-all duration-1000 ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-20'
    }`}
  >
    {/* コンテンツ */}
  </div>
);
```

## 必要なCSSアニメーション

```css
/* tailwind.config.js に追加 */
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'progress': 'progress 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
};
```

## 実装優先順位

### 高優先度（すぐに実装可能）
1. ✅ カードのホバーエフェクト強化
2. ✅ お知らせカードのフェードインアニメーション
3. ✅ ボタンのホバーエフェクト改善

### 中優先度（次のステップ）
4. ⭐ ヒーローセクションの背景アニメーション
5. ⭐ 統計情報セクションの追加
6. ⭐ スクロールトリガーアニメーション

### 低優先度（将来的に検討）
7. 🔄 パララックス効果
8. 🔄 インタラクティブなタイムライン
9. 🔄 ページローディングアニメーション

## まとめ

Sky株式会社のサイトから学んだ動的デザイン要素を、未来ネットワークのブランドイメージに合わせて適用する提案です。

**主な改善点**:
- 視覚的なインパクトの向上
- ユーザーエンゲージメントの強化
- モダンで洗練された印象
- スムーズなユーザー体験

どの要素から実装を始めますか？

