import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import { Building2, Heart, Users, Mail, Phone, MapPin, ExternalLink, Clock, Users2 } from "lucide-react";
import { Link } from "wouter";

/**
 * デザイン案3: モダンなカードグリッドレイアウト
 * - コンパクトなヒーロー
 * - グリッド型の事業所カード
 * - ホバーエフェクトを活用した動的なデザイン
 */
export default function HomeDesign3() {
  const facilities = [
    {
      name: "MIRAI",
      type: "就労継続支援B型",
      tagline: "個性を活かす就労支援",
      description: "一人ひとりの個性と能力を大切にし、自立した生活を目指すための就労支援を行っています。",
      capacity: "定員20名",
      hours: "平日 9:00-16:00",
      address: "東京都昭島市朝日町1-9-7 KKビル101",
      tel: "042-519-2942",
      email: "info@mirainetwork2017.com",
      image: "/mirai-products.webp",
      icon: "/mirai-icon.webp",
      link: "/mirai",
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      bgColor: "bg-blue-500",
    },
    {
      name: "HIKARI",
      type: "生活介護",
      tagline: "安心の日常生活支援",
      description: "日常生活の支援を通じて、利用者様が安心して充実した毎日を過ごせるようサポートいたします。",
      capacity: "定員20名",
      hours: "平日 9:00-16:00",
      address: "東京都昭島市緑町5-1-6",
      tel: "042-519-1905",
      email: "hikarinet2019@gmail.com",
      image: "/hikari-main-room.webp",
      icon: "/mirai-logo.webp",
      link: "/hikari",
      gradient: "from-cyan-400 via-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-500",
    },
    {
      name: "studio M",
      type: "就労継続支援B型",
      tagline: "創造性を育む場所",
      description: "創造的な活動を通じて、利用者様の可能性を広げ、社会参加を支援します。",
      capacity: "定員20名",
      hours: "平日 9:00-16:00",
      address: "東京都昭島市朝日町1-6-2 haramo cuprum 302号室",
      tel: "042-519-7916",
      email: "info@studiom.jp",
      image: "/studio-m-main.webp",
      icon: "/mirai-logo.webp",
      link: "/studio-m",
      gradient: "from-teal-400 via-teal-500 to-teal-600",
      bgColor: "bg-teal-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Compact Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 shadow-lg flex items-center justify-center p-2">
                <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">{APP_TITLE}</h1>
                <p className="text-xs text-muted-foreground">障害福祉サービス</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                法人概要
              </a>
              <a href="#facilities" className="text-sm font-medium hover:text-primary transition-colors">
                事業所
              </a>
              <Button size="sm" asChild>
                <a href="#contact">お問い合わせ</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Compact Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url('/hikari-interior.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              <span>一般社団法人未来ネットワーク</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              一人ひとりの未来を共に創る
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              障害福祉サービスを通じて、利用者様の自立と社会参加を支援しています
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <a href="#facilities">事業所を見る</a>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10" asChild>
                <a href="#contact">お問い合わせ</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">3</p>
              <p className="text-sm text-muted-foreground">運営事業所</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">9</p>
              <p className="text-sm text-muted-foreground">設立年数</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">60</p>
              <p className="text-sm text-muted-foreground">定員数</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">サポート</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section id="facilities" className="py-20 bg-slate-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">運営事業所</h3>
              <p className="text-lg text-muted-foreground">
                3つの事業所で、それぞれの特色を活かした支援を提供しています
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-primary/50"
                >
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${facility.gradient} opacity-40 group-hover:opacity-50 transition-opacity`}></div>
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center p-2">
                        <img src={facility.icon} alt={facility.name} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold">
                        {facility.type}
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-2xl mb-2">{facility.name}</CardTitle>
                    <CardDescription className="text-sm font-medium text-primary">
                      {facility.tagline}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {facility.description}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <Users2 className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{facility.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{facility.hours}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground line-clamp-2">{facility.address}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className={`w-full ${facility.bgColor} hover:opacity-90 group/btn`} asChild>
                        <Link href={facility.link}>
                          <a className="flex items-center justify-center gap-2">
                            詳しく見る
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">法人概要</h3>
              <p className="text-lg text-muted-foreground">一般社団法人未来ネットワークについて</p>
            </div>
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">名称</p>
                      <p className="font-bold">一般社団法人未来ネットワーク</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">代表理事</p>
                      <p className="font-bold">北村 陽朗</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">設立年月日</p>
                      <p className="font-bold">2016年7月1日</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">法人番号</p>
                      <p className="font-bold">9010105001875</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">事業内容</p>
                      <p className="font-bold">障害福祉サービス事業</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">資本金</p>
                      <p className="font-bold">500万円</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">法人登記所在地</p>
                      <p className="font-bold text-sm">東京都八王子内小町1096-16</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h3>
              <p className="text-lg text-muted-foreground">
                見学や体験、ご相談など、お気軽にお問い合わせください
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${facility.gradient} text-white mb-2`}>
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-bold text-lg mb-1">{facility.name}</p>
                      <p className="text-xs text-muted-foreground">{facility.type}</p>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>{facility.tel}</p>
                      <p className="text-primary hover:underline">
                        <a href={`mailto:${facility.email}`}>{facility.email}</a>
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
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
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center p-2">
                    <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain" />
                  </div>
                  <p className="font-bold text-white">一般社団法人未来ネットワーク</p>
                </div>
                <p className="text-sm text-slate-400">
                  障害福祉サービスを通じて、利用者様の自立と社会参加を支援しています。
                </p>
              </div>
              <div>
                <h5 className="font-bold text-white mb-4 text-sm">運営事業所</h5>
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
                <h5 className="font-bold text-white mb-4 text-sm">リンク</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#about" className="hover:text-white transition-colors">法人概要</a></li>
                  <li><a href="#facilities" className="hover:text-white transition-colors">事業所</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center">
              <p className="text-sm text-slate-400">
                &copy; 2016-2025 一般社団法人未来ネットワーク All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

