import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Clock, Users, MapPin, Phone, Mail, Calendar, Utensils, Bus, Palette, Monitor, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function StudioM() {
  const basicInfo = [
    { icon: Users, label: "定員", value: "20名（知的、精神の方）" },
    { icon: Clock, label: "開所時間", value: "9時30分～15時30分" },
    { icon: Calendar, label: "開所日", value: "平日（月1回程度祝日開所日あり）" },
    { icon: Calendar, label: "休日", value: "土・日・祝（開所日あり）、年末年始" },
    { icon: Bus, label: "交通", value: "昭島市内送迎対応（ご相談下さい）\n交通費支給あり（1日上限500円）" },
    { icon: Utensils, label: "昼食", value: "基本提供サービスあります\n1食200円です" },
  ];

  const activities = [
    { 
      icon: Palette,
      title: "クリエイティブワーク", 
      description: "デザイン制作や手芸など、創造的な活動を通じて表現力を育みます" 
    },
    { 
      icon: Monitor,
      title: "PC作業", 
      description: "パソコンを使用した作業を通じて、デジタルスキルを身につけます" 
    },
    { 
      icon: Lightbulb,
      title: "スキル開発", 
      description: "個々の能力に合わせた作業を通じて、社会参加に必要なスキルを習得します" 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="studio-m" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-amber-50 py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4">
              <Users className="w-10 h-10 text-yellow-700" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">studio M</h2>
            <p className="text-xl text-yellow-700 font-semibold">就労継続支援B型事業所</p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              創造的な活動を通じて、利用者様の可能性を広げ、社会参加を支援します。
              一人ひとりの個性を活かした作業環境で、スキルアップをサポートします。
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
                <img src="/office-interior.jpeg" alt="studio M内観" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/mirai-interior-1.jpeg" alt="studio M作業風景" className="w-full h-64 object-cover" />
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
              <div className="w-20 h-1 bg-yellow-700 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {basicInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-yellow-700" />
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

      {/* Activities */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-yellow-50/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">活動内容</h3>
              <div className="w-20 h-1 bg-yellow-700 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground">
                創造的な活動を通じて、利用者様の可能性を広げ、社会参加を支援します
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <Card key={index} className="border-2 bg-white hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-100 group-hover:shadow-md">
                        <Icon className="w-8 h-8 text-yellow-700 transition-colors duration-300 group-hover:text-yellow-800" />
                      </div>
                      <h4 className="text-xl font-bold mb-3">{activity.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-amber-50">
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
                      <p className="text-gray-700">〒196-0025 東京都昭島市朝日町1-6-2 haramo cuprum 302号室</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-2">電話・FAX</p>
                      <p className="text-gray-700">Tel: 042-519-7916</p>
                      <p className="text-gray-700">Fax: 042-519-7917</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-2">メールアドレス</p>
                      <a href="mailto:info@studiom.jp" className="text-cyan-600 hover:underline">
                        info@studiom.jp
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8" asChild>
                    <a href="mailto:info@studiom.jp">メールでお問い合わせ</a>
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
              <Link href="/mirai">
                <a className="hover:text-white transition-colors">MIRAI</a>
              </Link>
              {" | "}
              <Link href="/hikari">
                <a className="hover:text-white transition-colors">HIKARI</a>
              </Link>
            </p>
            <p className="text-sm">&copy; 2016-{new Date().getFullYear()} 一般社団法人未来ネットワーク All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

