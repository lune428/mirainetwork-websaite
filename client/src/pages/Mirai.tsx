import Header from "@/components/Header";
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
      <Header currentPage="mirai" />

      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/mirai-interior-2.jpeg" alt="MIRAI内観" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-4 p-3">
              <Building2 className="w-16 h-16 text-blue-600" />
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
                <img src="/mirai-exterior.jpeg" alt="MIRAI外観" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/mirai-interior-2.jpeg" alt="MIRAI内観" className="w-full h-64 object-cover" />
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
            <div className="grid md:grid-cols-2 gap-6">
              {activities.map((activity, index) => (
                <Card key={index} className="border-2 bg-white hover:shadow-lg transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100 group-hover:shadow-md">
                      <Briefcase className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-blue-700" />
                    </div>
                    <CardTitle className="text-xl">{activity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{activity.description}</CardDescription>
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
                <PartyPopper className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">年間イベント</h3>
              <div className="w-24 h-1 bg-cyan-500 mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground">
                季節ごとの楽しいイベントを通じて、仲間との交流を深めます
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {events.map((event, index) => (
                <Card key={index} className="text-center p-6 border-2 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-lg">{event}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">アクセス・お問い合わせ</h3>
              <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
            </div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-2">住所</p>
                      <p className="text-gray-700">〒196-0025 東京都昭島市朝日町1-9-7 KKビル101</p>
                      <p className="text-sm text-gray-600 mt-1">昭島駅・中神駅 南口より徒歩5分</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-2">電話・FAX</p>
                      <p className="text-gray-700">Tel: 042-519-2942</p>
                      <p className="text-gray-700">Fax: 042-519-4290</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-2">メールアドレス</p>
                      <a href="mailto:info@mirainetwork2017.com" className="text-cyan-600 hover:underline">
                        info@mirainetwork2017.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8" asChild>
                    <a href="mailto:info@mirainetwork2017.com">メールでお問い合わせ</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm mb-4">
              <Link href="/">
                <a className="hover:text-white transition-colors">ホームに戻る</a>
              </Link>
              {" | "}
              <Link href="/hikari">
                <a className="hover:text-white transition-colors">HIKARI</a>
              </Link>
              {" | "}
              <Link href="/studio-m">
                <a className="hover:text-white transition-colors">studio M</a>
              </Link>
            </p>
            <p className="text-sm">&copy; 2016-{new Date().getFullYear()} 一般社団法人未来ネットワーク All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

