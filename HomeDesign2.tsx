import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import { Building2, Heart, Users, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

/**
 * デザイン案2: 大きなビジュアルとスプリットレイアウト
 * - フルスクリーンヒーローイメージ
 * - 左右分割レイアウトで事業所を紹介
 * - ミニマルで洗練されたデザイン
 */
export default function HomeDesign2() {
  const facilities = [
    {
      name: "MIRAI",
      type: "就労継続支援B型事業所",
      description: "一人ひとりの個性と能力を大切にし、自立した生活を目指すための就労支援を行っています。",
      features: ["ハーバリウム制作", "軽作業", "創作活動", "社会参加支援"],
      address: "東京都昭島市朝日町1-9-7 KKビル101",
      tel: "042-519-2942",
      email: "info@mirainetwork2017.com",
      image: "/mirai-products.webp",
      link: "/mirai",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "HIKARI",
      type: "生活介護事業所",
      description: "日常生活の支援を通じて、利用者様が安心して充実した毎日を過ごせるようサポートいたします。",
      features: ["日常生活支援", "レクリエーション", "健康管理", "個別支援計画"],
      address: "東京都昭島市緑町5-1-6",
      tel: "042-519-1905",
      email: "hikarinet2019@gmail.com",
      image: "/hikari-main-room.webp",
      link: "/hikari",
      color: "from-cyan-500 to-teal-500",
    },
    {
      name: "studio M",
      type: "就労継続支援B型事業所",
      description: "創造的な活動を通じて、利用者様の可能性を広げ、社会参加を支援します。",
      features: ["クリエイティブワーク", "PC作業", "デザイン制作", "スキル開発"],
      address: "東京都昭島市朝日町1-6-2 haramo cuprum 302号室",
      tel: "042-519-7916",
      email: "info@studiom.jp",
      image: "/studio-m-main.webp",
      link: "/studio-m",
      color: "from-teal-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center p-1.5">
                <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain" />
              </div>
              <div className="text-white">
                <h1 className="text-lg font-bold drop-shadow-lg">{APP_TITLE}</h1>
              </div>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#about" className="text-sm font-medium text-white hover:text-white/80 transition-colors drop-shadow">
                法人概要
              </a>
              <a href="#facilities" className="text-sm font-medium text-white hover:text-white/80 transition-colors drop-shadow">
                事業所
              </a>
              <a href="#contact" className="text-sm font-medium text-white hover:text-white/80 transition-colors drop-shadow">
                お問い合わせ
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Full-screen Hero with Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hikari-interior.webp"
            alt="施設内観"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-cyan-900/70 to-teal-900/80"></div>
        </div>
        <div className="container relative z-10 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-md shadow-2xl mb-6 p-4 border-4 border-white/20">
              <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
              一人ひとりの未来を
              <br />
              共に創る
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
              障害福祉サービスを通じて、利用者様の自立と社会参加を支援する
              <br />
              3つの事業所を運営しています
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6" asChild>
                <a href="#facilities">事業所を見る</a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6" asChild>
                <a href="#contact">お問い合わせ</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section - Split Layout */}
      <section id="about" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                  About Us
                </div>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">法人概要</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  一般社団法人未来ネットワークは、2016年7月に設立され、障害福祉サービス事業を通じて、
                  利用者様一人ひとりの個性を大切にし、自立した生活と社会参加を支援しています。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">3つの事業所を運営</p>
                      <p className="text-sm text-muted-foreground">MIRAI、HIKARI、studio M</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">個別支援計画に基づいたサポート</p>
                      <p className="text-sm text-muted-foreground">一人ひとりに合わせた支援を提供</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">地域に根ざした活動</p>
                      <p className="text-sm text-muted-foreground">東京都昭島市を中心に展開</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card className="border-2 shadow-xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">名称</p>
                        <p className="font-bold">一般社団法人未来ネットワーク</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">法人番号</p>
                        <p className="font-bold">9010105001875</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">代表理事</p>
                        <p className="font-bold">北村 陽朗</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">設立年月日</p>
                        <p className="font-bold">2016年7月1日</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">資本金</p>
                        <p className="font-bold">500万円</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">事業内容</p>
                        <p className="font-bold">障害福祉サービス事業</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-xs text-muted-foreground mb-1">法人登記所在地</p>
                      <p className="font-bold text-sm">東京都八王子内小町1096-16</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section - Alternating Layout */}
      <section id="facilities" className="py-24 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Our Facilities
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">運営事業所</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                それぞれの特色を活かした3つの事業所で、利用者様の多様なニーズに応えます
              </p>
            </div>

            <div className="space-y-24">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${facility.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm font-semibold text-primary mb-2">{facility.type}</p>
                        <h4 className="text-4xl font-bold mb-4">{facility.name}</h4>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {facility.description}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {facility.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${facility.color}`}></div>
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-4">
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{facility.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{facility.tel}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                          <a href={`mailto:${facility.email}`} className="text-primary hover:underline">
                            {facility.email}
                          </a>
                        </div>
                      </div>

                      <Button className={`bg-gradient-to-r ${facility.color} text-white border-0 group/btn`} asChild>
                        <Link href={facility.link}>
                          <a className="flex items-center gap-2">
                            詳しく見る
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
              Contact
            </div>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">お問い合わせ</h3>
            <p className="text-lg text-white/80 mb-12">
              見学や体験、ご相談など、お気軽にお問い合わせください
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all">
                  <CardContent className="p-6 text-center space-y-4">
                    <p className="font-bold text-xl">{facility.name}</p>
                    <p className="text-sm text-white/80">{facility.type}</p>
                    <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-primary" asChild>
                      <a href={`mailto:${facility.email}`}>メールで問い合わせ</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1.5">
                    <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain opacity-80" />
                  </div>
                  <p className="font-bold text-white text-lg">一般社団法人未来ネットワーク</p>
                </div>
                <p className="text-sm mb-4">
                  障害福祉サービスを通じて、利用者様の自立と社会参加を支援しています。
                </p>
                <p className="text-xs">設立: 2016年7月1日 | 代表理事: 北村 陽朗</p>
              </div>
              <div>
                <h5 className="font-bold text-white mb-4">運営事業所</h5>
                <ul className="space-y-2 text-sm">
                  {facilities.map((facility, index) => (
                    <li key={index}>
                      <Link href={facility.link}>
                        <a className="hover:text-white transition-colors">{facility.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-white mb-4">リンク</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">法人概要</a>
                  </li>
                  <li>
                    <a href="#facilities" className="hover:text-white transition-colors">事業所紹介</a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center">
              <p className="text-sm">&copy; 2016-2025 一般社団法人未来ネットワーク All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

