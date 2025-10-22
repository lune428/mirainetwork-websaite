import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Clock, Users, MapPin, Phone, Mail, Calendar, Utensils, Bus, Briefcase, PartyPopper } from "lucide-react";
import { Link } from "wouter";

export default function Mirai() {
  const basicInfo = [
    { icon: Users, label: "定員", value: "20名（知的、精神の方）" },
    { icon: Clock, label: "開所時間", value: "9時30分～15時30分" },
    { icon: Calendar, label: "開所日", value: "平日（月1回程度祝日開所日あり）" },
    { icon: Calendar, label: "休日", value: "土・日・祝（開所日あり）、年末年始" },
    { icon: Bus, label: "交通", value: "昭島市内送迎対応（ご相談下さい）\n交通費支給あり（1日上限500円）" },
    { icon: Utensils, label: "昼食", value: "基本提供サービスあります\n1食200円です" },
  ];

  const activities = [
    { title: "缶バッジ作業", description: "オリジナルデザインの缶バッジを製作しています" },
    { title: "ナフキン検品", description: "丁寧な検品作業を通じて品質管理を学びます" },
    { title: "古本回収・販売", description: "リサイクル活動を通じて社会貢献を実践します" },
    { title: "小物製作", description: "手作りの小物を製作し、創造性を育みます" },
  ];

  const events = [
    "新年会", "バレンタインデー", "お花見", "ランチ会",
    "日帰り旅行", "ハロウィン", "クリスマス", "年納め"
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
                <a className="text-sm font-medium text-primary">MIRAI</a>
              </Link>
              <Link href="/hikari">
                <a className="text-sm font-medium hover:text-primary transition-colors">HIKARI</a>
              </Link>
              <Link href="/studio-m">
                <a className="text-sm font-medium hover:text-primary transition-colors">studio M</a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/mirai-products.webp" alt="MIRAI製品" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4 p-3">
              <img src="/mirai-icon.webp" alt="MIRAIアイコン" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">MIRAI</h2>
            <p className="text-xl text-primary font-semibold">就労継続支援B型事業所</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              一人ひとりの個性と能力を大切にし、自立した生活を目指すための就労支援を行っています。
              様々な作業活動を通じて、利用者様のスキルアップと社会参加をサポートします。
            </p>
          </div>
        </div>
      </section>

      {/* Facility Images */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/mirai-entrance.webp" alt="MIRAI入口" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/mirai-green-logo.webp" alt="MIRAI" className="w-full h-64 object-cover" />
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
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
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

      {/* Work Activities */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">作業活動</h3>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground">
                多様な作業を通じて、それぞれのペースでスキルを身につけることができます
              </p>
            </div>
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img src="/mirai-craft-work.webp" alt="作業風景" className="w-full h-80 object-cover" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <Card key={index} className="border-2 bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">余暇活動</h3>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground">
                季節ごとのイベントを通じて、楽しい思い出づくりと交流を深めます
              </p>
            </div>
            <Card className="border-2">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {events.map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                      <PartyPopper className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{event}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
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
                      <p className="text-muted-foreground">〒196-0025 東京都昭島市朝日町1-9-7 KKビル101</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        昭島駅・中神駅 南口より徒歩5分
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">電話・FAX</p>
                      <p className="text-muted-foreground">Tel: 042-519-2942</p>
                      <p className="text-muted-foreground">Fax: 042-519-4290</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold mb-1">メールアドレス</p>
                      <a href="mailto:info@mirainetwork2017.com" className="text-primary hover:underline">
                        info@mirainetwork2017.com
                      </a>
                    </div>
                  </div>
                  <div className="pt-6 border-t">
                    <Button size="lg" className="w-full md:w-auto" asChild>
                      <a href="mailto:info@mirainetwork2017.com">メールでお問い合わせ</a>
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

