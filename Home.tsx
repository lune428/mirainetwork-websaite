import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TITLE } from "@/const";
import { Building2, Heart, Users, Mail, Phone, MapPin, ChevronRight, Calendar, Clock, Megaphone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useUser } from "@/hooks/use-user";
import AnnouncementsList from "@/components/AnnouncementsList";

export default function Home() {
  // const { user, loading, error, isAuthenticated } = useUser();

  // 背景画像スライドショー
  const heroImages = [
    "/mirai-interior-2.jpeg",  // MIRAI内観
    "/hikari-interior-1.jpeg",  // HIKARI内観
    "/mirai-interior-1.jpeg",  // MIRAI内観2
    "/office-interior.jpeg",  // オフィス内観
    "/IMG_9850(1).jpeg",  // 施設写真
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
      id: "mirai",
      name: "MIRAI",
      type: "就労継続支援B型事業所",
      description: "一人ひとりの個性と能力を大切にし、自立した生活を目指すための就労支援を行っています。",
      address: "東京都昭島市朝日町1-9-7 KKビル101",
      tel: "042-519-2942",
      fax: "042-519-4290",
      email: "info@mirainetwork2017.com",
      color: "bg-sky-50 border-sky-200",
      hoverColor: "hover:border-sky-300",
      icon: Building2,
      image: "/mirai-interior-2.jpeg",
      link: "/mirai",
    },
    {
      id: "hikari",
      name: "HIKARI",
      type: "生活介護事業所",
      description: "日常生活の支援を通じて、利用者様が安心して充実した毎日を過ごせるようサポートいたします。",
      address: "東京都昭島市緑町5-1-6",
      tel: "042-519-1905",
      fax: "042-519-1906",
      email: "hikarinet2019@gmail.com",
      color: "bg-emerald-50 border-emerald-200",
      hoverColor: "hover:border-emerald-300",
      icon: Heart,
      image: "/mirai-interior-1.jpeg",
      link: "/hikari",
    },
    {
      id: "studio_m",
      name: "studio M",
      type: "就労継続支援B型事業所",
      description: "創造的な活動を通じて、利用者様の可能性を広げ、社会参加を支援します。",
      address: "東京都昭島市朝日町1-6-2 haramo cuprum 302号室",
      tel: "042-519-7916",
      fax: "042-519-7917",
      email: "info@studiom.jp",
      color: "bg-yellow-50 border-yellow-700/30",
      hoverColor: "hover:border-yellow-800/40",
      icon: Users,
      image: "/office-interior.jpeg",
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
              障害福祉サービスを通じて、利用者様の自立と社会参加を支援する
              <br className="hidden md:block" />
              3つの事業所を運営しています
            </p>
          </div>

          {/* 丸いボタン - 建物写真入りデザイン */}
          <div className="flex flex-wrap gap-12 md:gap-16 justify-center items-center">
            {/* MIRAI - ブルー */}
            <Link href="/mirai">
              <div className="group cursor-pointer relative">
                {/* 装飾的な外枝 */}
                <div className="absolute -inset-8 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {/* 左上の葉 */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-sky-200 rounded-full blur-md"></div>
                  {/* 右下の葉 */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-sky-300 rounded-full blur-md"></div>
                </div>
                
                {/* メインボタン */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-sky-200/60 group-hover:border-sky-300/80">
                  {/* 建物写真 */}
                  <img 
                    src="/mirai-exterior.jpeg" 
                    alt="MIRAI" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* オーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-300/30 to-sky-400/30 group-hover:from-sky-300/15 group-hover:to-sky-400/15 transition-all duration-500"></div>
                  
                  {/* テキスト */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-2xl md:text-3xl font-bold drop-shadow-lg">MIRAI</div>
                    <div className="text-sm md:text-base opacity-90 drop-shadow-md">就労継続支援B型</div>
                  </div>
                </div>
                
                {/* クリックテキスト */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sky-600 font-semibold whitespace-nowrap text-sm">ここをクリック</span>
                </div>
              </div>
            </Link>

            {/* HIKARI - 黄緑 */}
            <Link href="/hikari">
              <div className="group cursor-pointer relative">
                {/* 装飾的な外枝 */}
                <div className="absolute -inset-8 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {/* 左上の葉 */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-emerald-200 rounded-full blur-md"></div>
                  {/* 右下の葉 */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-emerald-300 rounded-full blur-md"></div>
                </div>
                
                {/* メインボタン */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-emerald-200/60 group-hover:border-emerald-300/80">
                  {/* 建物写真 */}
                  <img 
                    src="/hikari-exterior.jpeg" 
                    alt="HIKARI" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* オーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/30 to-emerald-400/30 group-hover:from-emerald-300/15 group-hover:to-emerald-400/15 transition-all duration-500"></div>
                  
                  {/* テキスト */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-2xl md:text-3xl font-bold drop-shadow-lg">HIKARI</div>
                    <div className="text-sm md:text-base opacity-90 drop-shadow-md">生活介護</div>
                  </div>
                </div>
                
                {/* クリックテキスト */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-emerald-600 font-semibold whitespace-nowrap text-sm">ここをクリック</span>
                </div>
              </div>
            </Link>

            {/* studio M - ブラウン */}
            <Link href="/studio-m">
              <div className="group cursor-pointer relative">
                {/* 装飾的な外枝 */}
                <div className="absolute -inset-8 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {/* 左上の葉 */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-700/40 rounded-full blur-md"></div>
                  {/* 右下の葉 */}
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-800/40 rounded-full blur-md"></div>
                </div>
                
                {/* メインボタン */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-yellow-700/50 group-hover:border-yellow-800/70">
                  {/* 建物写真 */}
                  <img 
                    src="/office-interior.jpeg" 
                    alt="studio M" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* オーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-700/25 to-yellow-800/25 group-hover:from-yellow-700/12 group-hover:to-yellow-800/12 transition-all duration-500"></div>
                  
                  {/* テキスト */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-2xl md:text-3xl font-bold drop-shadow-lg">studio M</div>
                    <div className="text-sm md:text-base opacity-90 drop-shadow-md">就労継続支援B型</div>
                  </div>
                </div>
                
                {/* クリックテキスト */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-yellow-800 font-semibold whitespace-nowrap text-sm">ここをクリック</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section id="announcements" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sky-50 mb-6">
              <Megaphone className="w-10 h-10 text-sky-600" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">お知らせ・ニュース</h3>
            <p className="text-lg text-muted-foreground">
              最新のお知らせやイベント情報をご確認いただけます
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <AnnouncementsList />
          </div>
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
            <Button size="lg" className="mt-8" asChild>
              <Link href="/about">
                <a className="flex items-center gap-2">
                  詳しく見る
                  <ChevronRight className="w-4 h-4" />
                </a>
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
                          <Link href={facility.link}>
                            <a className="flex items-center gap-2">
                              詳しく見る
                              <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
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

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h3>
              <p className="text-lg text-muted-foreground">
                ご質問やご相談がございましたら、お気軽にお問い合わせください。
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-xl font-semibold mb-6 text-center">各事業所へのお問い合わせ</h4>
              <p className="text-center text-muted-foreground mb-8">
                各事業所ごとに、見学や体験を随時受け付けております。
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {facilities.map((facility) => (
                  <Card key={facility.name} className="text-center p-8 bg-white border shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-6">
                      <Mail className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                      <h5 className="font-bold text-xl mb-2">{facility.name}</h5>
                      <p className="text-sm text-muted-foreground">{facility.type}</p>
                    </div>

                    <Button variant="outline" asChild className="w-full">
                      <Link href={`/contact?facility=${facility.id}`}>
                        <a>
                          お問い合わせ
                        </a>
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
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
                {facilities.map((facility) => (
                  <li key={facility.name}>
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
                  <Link href="/about">
                    <a className="hover:text-white transition-colors">未来ネットワークについて</a>
                  </Link>
                </li>
                <li>
                  <Link href="/mirai">
                    <a className="hover:text-white transition-colors">MIRAI</a>
                  </Link>
                </li>
                <li>
                  <Link href="/hikari">
                    <a className="hover:text-white transition-colors">HIKARI</a>
                  </Link>
                </li>
                <li>
                  <Link href="/studio-m">
                    <a className="hover:text-white transition-colors">studio M</a>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4">お問い合わせ</h5>
              <p className="text-sm">
                各事業所へ直接お問い合わせください。
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2016-{new Date().getFullYear()} 一般社団法人未来ネットワーク All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

