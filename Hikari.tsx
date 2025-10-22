import Header from "@/components/Header";
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
      <Header currentPage="hikari" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-4">
              <Heart className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">HIKARI</h2>
            <p className="text-xl text-emerald-600 font-semibold">生活介護事業所</p>
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
                <img src="/hikari-exterior.jpeg" alt="HIKARI外観" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/hikari-interior-1.jpeg" alt="HIKARI内観" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img src="/mirai-interior-1.jpeg" alt="HIKARIメインルーム" className="w-full h-64 object-cover" />
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
              <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {basicInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-2 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-emerald-600" />
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">支援の特徴</h3>
              <div className="w-20 h-1 bg-emerald-600 mx-auto rounded-full mb-6"></div>
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
                      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-emerald-600" />
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

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-50 to-teal-50">
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
                      <p className="text-gray-700">〒196-0002 東京都昭島市緑町5-1-6</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-2">電話・FAX</p>
                      <p className="text-gray-700">Tel: 042-519-1905</p>
                      <p className="text-gray-700">Fax: 042-519-1906</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-cyan-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-lg mb-2">メールアドレス</p>
                      <a href="mailto:hikarinet2019@gmail.com" className="text-cyan-600 hover:underline">
                        hikarinet2019@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8" asChild>
                    <a href="mailto:hikarinet2019@gmail.com">メールでお問い合わせ</a>
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

