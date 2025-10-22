import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import { Building2, Heart, Users, Mail, Phone, MapPin, ChevronRight, Calendar, Clock, Megaphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import InstagramFeed from "@/components/InstagramFeed";
import AnnouncementsList from "@/components/AnnouncementsList";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  // 背景画像スライドショー
  const heroImages = [
    "/mirai-products.webp",
    "/hikari-main-room.webp",
    "/studio-m-main.webp",
    "/mirai-green-logo.webp",
    "/hikari-interior.webp",
    "/studio-m-reception.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // 5秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  const facilities = [
    {
      name: "MIRAI",
      type: "就労継続支援B型事業所",
      description: "一人ひとりの個性と能力を大切にし、自立した生活を目指すための就労支援を行っています。",
      address: "東京都昭島市朝日町1-9-7 KKビル101",
      tel: "042-519-2942",
      fax: "042-519-4290",
      email: "info@mirainetwork2017.com",
      color: "bg-blue-50 border-blue-200",
      hoverColor: "hover:border-blue-300",
      icon: Building2,
      image: "/mirai-products.webp",
      link: "/mirai",
    },
    {
      name: "HIKARI",
      type: "生活介護事業所",
      description: "日常生活の支援を通じて、利用者様が安心して充実した毎日を過ごせるようサポートいたします。",
      address: "東京都昭島市緑町5-1-6",
      tel: "042-519-1905",
      fax: "042-519-1906",
      email: "hikarinet2019@gmail.com",
      color: "bg-cyan-50 border-cyan-200",
      hoverColor: "hover:border-cyan-300",
      icon: Heart,
      image: "/hikari-main-room.webp",
      link: "/hikari",
    },
    {
      name: "studio M",
      type: "就労継続支援B型事業所",
      description: "創造的な活動を通じて、利用者様の可能性を広げ、社会参加を支援します。",
      address: "東京都昭島市朝日町1-6-2 haramo cuprum 302号室",
      tel: "042-519-7916",
      fax: "042-519-7917",
      email: "info@studiom.jp",
      color: "bg-teal-50 border-teal-200",
      hoverColor: "hover:border-teal-300",
      icon: Users,
      image: "/studio-m-main.webp",
      link: "/studio-m",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="home" />

      {/* Hero Section with Background Image Slideshow */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* 背景画像スライドショー */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt="" 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
        
        {/* 暗いオーバーレイ（テキストの可読性向上） */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* コンテンツ */}
        <div className="container relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              一人ひとりの未来を
              <br />
              共に創る
            </h2>
            <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-md">
              一般社団法人未来ネットワークは、障害福祉サービスを通じて、
              <br className="hidden md:block" />
              利用者様の自立と社会参加を支援しています。
            </p>
          </div>

          {/* 丸いボタン - デザイン強化版 */}
          <div className="flex flex-wrap gap-8 justify-center items-center">
            {/* MIRAI - ブルー */}
            <Link href="/mirai">
              <div className="group cursor-pointer relative">
                {/* 外側の光る輪 */}
                <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl group-hover:bg-blue-400/50 transition-all duration-500 animate-pulse"></div>
                
                {/* メインボタン */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-500 flex flex-col items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:shadow-blue-500/50 group-hover:rotate-6">
                  {/* 光沢効果 */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
                  
                  {/* コンテンツ */}
                  <div className="relative z-10">
                    <Building2 className="w-12 h-12 md:w-14 md:h-14 mb-2 mx-auto group-hover:scale-110 transition-transform" />
                    <div className="text-xl md:text-2xl font-bold">MIRAI</div>
                    <div className="text-xs md:text-sm opacity-90">就労継続支援B型</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* HIKARI - 黄緑 */}
            <Link href="/hikari">
              <div className="group cursor-pointer relative">
                {/* 外側の光る輪 */}
                <div className="absolute inset-0 rounded-full bg-lime-400/30 blur-xl group-hover:bg-lime-400/50 transition-all duration-500 animate-pulse"></div>
                
                {/* メインボタン */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600 hover:from-lime-500 hover:via-lime-600 hover:to-lime-700 transition-all duration-500 flex flex-col items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:shadow-lime-500/50 group-hover:rotate-6">
                  {/* 光沢効果 */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
                  
                  {/* コンテンツ */}
                  <div className="relative z-10">
                    <Heart className="w-12 h-12 md:w-14 md:h-14 mb-2 mx-auto group-hover:scale-110 transition-transform" />
                    <div className="text-xl md:text-2xl font-bold">HIKARI</div>
                    <div className="text-xs md:text-sm opacity-90">生活介護</div>
                  </div>
                </div>
              </div>
            </Link>

            {/* studio M - ブラウン */}
            <Link href="/studio-m">
              <div className="group cursor-pointer relative">
                {/* 外側の光る輪 */}
                <div className="absolute inset-0 rounded-full bg-amber-600/30 blur-xl group-hover:bg-amber-600/50 transition-all duration-500 animate-pulse"></div>
                
                {/* メインボタン */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:via-amber-800 hover:to-amber-900 transition-all duration-500 flex flex-col items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:shadow-amber-700/50 group-hover:rotate-6">
                  {/* 光沢効果 */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
                  
                  {/* コンテンツ */}
                  <div className="relative z-10">
                    <Users className="w-12 h-12 md:w-14 md:h-14 mb-2 mx-auto group-hover:scale-110 transition-transform" />
                    <div className="text-xl md:text-2xl font-bold">studio M</div>
                    <div className="text-xs md:text-sm opacity-90">就労継続支援B型</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Section - ヒーローの直後に配置 */}
      <section id="announcements" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Megaphone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">お知らせ・ニュース</h3>
            <p className="text-lg text-muted-foreground">
              最新のお知らせやイベント情報をご確認いただけます
            </p>
          </div>

          <AnnouncementsList />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">法人概要</h3>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                一般社団法人未来ネットワークは、2016年7月に設立され、障害福祉サービス事業を通じて、<br />
                利用者様一人ひとりの個性を大切にし、自立した生活と社会参加を支援しています。<br />
                東京都昭島市を中心に、3つの事業所（MIRAI、HIKARI、studio M）を運営しております。
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/about" className="flex items-center gap-2">
                詳しい法人情報を見る
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">運営事業所</h3>
            <p className="text-lg text-muted-foreground">
              3つの事業所で、それぞれの特色を活かした支援を提供しています
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <div key={facility.name} className="group">
                <Card className={`${facility.color} border-2 ${facility.hoverColor} transition-all duration-300 hover:shadow-xl overflow-hidden h-full`}>
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 z-10"></div>
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-full bg-white">
                          <facility.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{facility.name}</CardTitle>
                      </div>
                      <CardDescription className="text-base">{facility.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {facility.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{facility.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="text-muted-foreground">
                            <span>Tel: {facility.tel}</span>
                            {facility.fax && (
                              <>
                                <span className="mx-2">/</span>
                                <span>Fax: {facility.fax}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button variant="default" className="group/btn" asChild>
                          <Link href={facility.link} className="flex items-center gap-2">
                            詳しく見る
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <InstagramFeed username="studio.m2022" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h3>
              <p className="text-lg text-muted-foreground">
                ご質問やご相談がございましたら、お気軽にお問い合わせください。
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-xl font-semibold mb-6 text-center">各事業所へのお問い合わせ</h4>
              <p className="text-center text-muted-foreground mb-8">
                各事業所ごとに、見学や体験、セッションを随時受け付けております。
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {facilities.map((facility) => (
                  <Card key={facility.name} className="text-center p-6">
                    <div className="mb-4">
                      <facility.icon className="w-12 h-12 mx-auto text-primary mb-2" />
                      <h5 className="font-bold text-lg">{facility.name}</h5>
                      <p className="text-sm text-muted-foreground">{facility.type}</p>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">メール送信</span>
                      </div>
                    </div>
                    <Button variant="outline" asChild className="w-full">
                      <a href={`mailto:${facility.email}`}>お問い合わせ</a>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h5 className="font-bold text-white mb-4">一般社団法人未来ネットワーク</h5>
              <p className="text-sm leading-relaxed">
                障害福祉サービスを通じて、利用者様の自立と社会参加を支援しています。
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">運営事業所</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/mirai" className="hover:text-white transition-colors">
                    就労継続支援B型 MIRAI
                  </Link>
                </li>
                <li>
                  <Link href="/hikari" className="hover:text-white transition-colors">
                    生活介護 HIKARI
                  </Link>
                </li>
                <li>
                  <Link href="/studio-m" className="hover:text-white transition-colors">
                    就労継続支援B型 studio M
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">リンク</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    法人概要
                  </a>
                </li>
                <li>
                  <a href="#facilities" className="hover:text-white transition-colors">
                    運営事業所
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">SNS</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/studio.m2022/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram (studio M)
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 一般社団法人未来ネットワーク All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

