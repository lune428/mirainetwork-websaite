import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Clock, Users, MapPin, Phone, Mail, Calendar, Utensils, Bus, Heart, Smile, HandHeart } from "lucide-react";
import { Link } from "wouter";

export default function Hikari() {
  const basicInfo = [
    { icon: Users, label: "定員", value: "20名" },
    { icon: Clock, label: "開所時間", value: "9時30分～15時30分" },
    { icon: Calendar, label: "開所日", value: "平日（月1回程度祝日開所日あり）" },
    { icon: Calendar, label: "休日", value: "土・日・祝（開所日あり）、年末年始" },
    { icon: Bus, label: "交通", value: "昭島市内送迎対応（ご相談下さい）\n交通費支給あり（1日上限500円）" },
    { icon: Utensils, label: "昼食", value: "基本提供サービスあります\n1食200円です" },
  ];

  const features = [
    {
      icon: Heart,
      title: "個別支援",
      description: "一人ひとりの状態や希望に合わせた、きめ細やかな支援を提供します。利用者様の個性を尊重し、その方らしい生活をサポートします。"
    },
    {
      icon: Smile,
      title: "日常生活支援",
      description: "食事、入浴、排泄などの日常生活動作の支援を通じて、安心して過ごせる環境を整えています。"
    },
    {
      icon: HandHeart,
      title: "創作活動",
      description: "絵画、音楽、手芸など、様々な創作活動を通じて、利用者様の表現力や創造性を育みます。"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center p-1">
                  <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">一般社団法人未来ネットワーク</h1>
                  <p className="text-sm text-muted-foreground">障害福祉サービス</p>
                </div>
              </a>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/">
                <a className="text-sm font-medium hover:text-primary transition-colors">ホーム</a>
              </Link>
              <Link href="/mirai">
                <a className="text-sm font-medium hover:text-primary transition-colors">MIRAI</a>
              </Link>
              <Link href="/hikari">
                <a className="text-sm font-medium text-primary">HIKARI</a>
              </Link>
              <Link href="/studio-m">
                <a className="text-sm font-medium hover:text-primary transition-colors">studio M</a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-teal-50 py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">HIKARI</h2>
            <p className="text-xl text-primary font-semibold">生活介護事業所</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              日常生活の支援を通じて、利用者様が安心して充実した毎日を過ごせるようサポートいたします。
              温かい雰囲気の中で、一人ひとりのペースに合わせた活動を提供しています。
            </p>
          </div>
        </div>
      </section>

      {/* Facility Images */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/hikari-exterior.webp" alt="HIKARI外観" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/hikari-interior.webp" alt="HIKARI内観" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/hikari-main-room.webp" alt="HIKARIメインルーム" className="w-full h-64 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">基本情報</h3>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {basicInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          <p className="font-semibold whitespace-pre-line">{item.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-cyan-50/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">支援の特徴</h3>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground">
                利用者様お一人おひとりに寄り添った支援を心がけています
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-2 bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Daily Activities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">日々の活動</h3>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            </div>
            <Card className="border-2">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    HIKARIでは、利用者様が楽しく充実した時間を過ごせるよう、様々な活動プログラムを用意しています。
                    創作活動、レクリエーション、季節の行事など、一人ひとりの興味や能力に合わせた活動を通じて、
                    心身の健康維持と生活の質の向上を目指しています。
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-cyan-50 p-6 rounded-lg">
                      <h5 className="font-bold text-lg mb-3 text-foreground">創作活動</h5>
                      <p className="text-muted-foreground">
                        絵画、工作、音楽など、様々な創作活動を通じて表現する喜びを感じていただけます。
                      </p>
                    </div>
                    <div className="bg-cyan-50 p-6 rounded-lg">
                      <h5 className="font-bold text-lg mb-3 text-foreground">レクリエーション</h5>
                      <p className="text-muted-foreground">
                        体操、ゲーム、外出活動など、楽しみながら心身をリフレッシュできる時間を提供します。
                      </p>
                    </div>
                    <div className="bg-cyan-50 p-6 rounded-lg">
                      <h5 className="font-bold text-lg mb-3 text-foreground">季節の行事</h5>
                      <p className="text-muted-foreground">
                        お花見、夏祭り、クリスマス会など、四季折々のイベントで思い出づくりをサポートします。
                      </p>
                    </div>
                    <div className="bg-cyan-50 p-6 rounded-lg">
                      <h5 className="font-bold text-lg mb-3 text-foreground">日常生活支援</h5>
                      <p className="text-muted-foreground">
                        食事、入浴、排泄などの日常生活動作を、丁寧にサポートいたします。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-cyan-50 to-teal-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">アクセス・お問い合わせ</h3>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
            <Card className="border-2 bg-white">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">住所</p>
                      <p className="text-muted-foreground">〒196-0004 東京都昭島市緑町5-1-6</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">電話・FAX</p>
                      <p className="text-muted-foreground">Tel: 042-519-1905</p>
                      <p className="text-muted-foreground">Fax: 042-519-1906</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">メールアドレス</p>
                      <a href="mailto:hikarinet2019@gmail.com" className="text-primary hover:underline">
                        hikarinet2019@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="pt-6 border-t">
                    <Button size="lg" className="w-full md:w-auto" asChild>
                      <a href="mailto:hikarinet2019@gmail.com">メールでお問い合わせ</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container">
          <div className="text-center">
            <p className="text-sm">&copy; 2016-2025 一般社団法人未来ネットワーク All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

