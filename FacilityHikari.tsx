import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Users, Calendar, Heart } from "lucide-react";
import { FACILITIES } from "@shared/const";

export default function FacilityHikari() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container">
        {/* Hero Section */}
        <div className="facility-hikari rounded-lg p-8 md:p-12 mb-12" style={{ backgroundColor: 'var(--facility-bg)' }}>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--facility-color)' }}>
              {FACILITIES.hikari.name}
            </h1>
            <p className="text-xl text-gray-700 mb-6">{FACILITIES.hikari.fullName}</p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {FACILITIES.hikari.description}
            </p>
          </div>
        </div>

        {/* Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/images/facilities/YGVOiKR03NKM.jpg" 
              alt="HIKARI入口"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/images/facilities/c6SxFXWGAcJR.jpg" 
              alt="HIKARI内部"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="/images/facilities/0IQ0QjoCwuES.jpg" 
              alt="HIKARI作品"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Basic Information */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">基本情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-1 flex-shrink-0 text-cyan-600" />
                    <div>
                      <p className="font-semibold mb-1">所在地</p>
                      <p className="text-gray-700">{FACILITIES.hikari.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={20} className="mt-1 flex-shrink-0 text-cyan-600" />
                    <div>
                      <p className="font-semibold mb-1">電話・FAX</p>
                      <p className="text-gray-700">Tel: {FACILITIES.hikari.tel}</p>
                      <p className="text-gray-700">Fax: {FACILITIES.hikari.fax}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="mt-1 flex-shrink-0 text-cyan-600" />
                    <div>
                      <p className="font-semibold mb-1">メールアドレス</p>
                      <a href={`mailto:${FACILITIES.hikari.email}`} className="text-cyan-600 hover:underline">
                        {FACILITIES.hikari.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={20} className="mt-1 flex-shrink-0 text-cyan-600" />
                    <div>
                      <p className="font-semibold mb-1">開所時間</p>
                      <p className="text-gray-700">9:30～15:30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="mt-1 flex-shrink-0 text-cyan-600" />
                    <div>
                      <p className="font-semibold mb-1">開所日</p>
                      <p className="text-gray-700">平日（月1回程度祝日開所日あり）</p>
                      <p className="text-sm text-gray-600">休日: 土・日・祝（開所日あり）、年末年始</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={20} className="mt-1 flex-shrink-0 text-cyan-600" />
                    <div>
                      <p className="font-semibold mb-1">定員</p>
                      <p className="text-gray-700">20名</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Activities */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">日常活動</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <Heart size={20} className="text-cyan-600" />
                      創作活動
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      絵画、工作、音楽など、様々な創作活動を通して、
                      利用者様の感性を育み、自己表現の機会を提供しています。
                    </p>
                    <div className="bg-cyan-50 p-4 rounded-lg">
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 季節の飾り物作り</li>
                        <li>• 絵画・塗り絵</li>
                        <li>• 音楽療法</li>
                        <li>• 手芸・工作</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <Heart size={20} className="text-cyan-600" />
                      身体活動
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      適度な運動を通して、健康維持と体力向上を図ります。
                      楽しみながら体を動かせるプログラムを用意しています。
                    </p>
                    <div className="bg-cyan-50 p-4 rounded-lg">
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 体操・ストレッチ</li>
                        <li>• 散歩</li>
                        <li>• レクリエーション</li>
                        <li>• リハビリ活動</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-lg flex items-center gap-2">
                      <Heart size={20} className="text-cyan-600" />
                      日常生活支援
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      食事、入浴、排泄などの日常生活動作の支援を行い、
                      利用者様が安心して過ごせる環境を整えています。
                    </p>
                    <div className="bg-cyan-50 p-4 rounded-lg">
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 食事介助</li>
                        <li>• 入浴介助</li>
                        <li>• 排泄介助</li>
                        <li>• 健康管理</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">年間行事</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-cyan-900">春</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• お花見</li>
                      <li>• 春の遠足</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-cyan-900">夏</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 七夕祭り</li>
                      <li>• 夏祭り</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-cyan-900">秋</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 運動会</li>
                      <li>• 紅葉狩り</li>
                    </ul>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-cyan-900">冬</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• クリスマス会</li>
                      <li>• 新年会</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-8 sticky top-4">
              <CardHeader>
                <CardTitle>サービス内容</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="pb-4 border-b">
                    <h4 className="font-semibold mb-2">送迎サービス</h4>
                    <p className="text-sm text-gray-700">
                      昭島市内の送迎に対応しています。
                      安全運転を心がけ、ご自宅まで送迎いたします。
                    </p>
                  </div>
                  <div className="pb-4 border-b">
                    <h4 className="font-semibold mb-2">昼食提供</h4>
                    <p className="text-sm text-gray-700">
                      栄養バランスの取れた昼食を1食200円で提供しています。
                    </p>
                  </div>
                  <div className="pb-4 border-b">
                    <h4 className="font-semibold mb-2">入浴サービス</h4>
                    <p className="text-sm text-gray-700">
                      清潔で快適な入浴をサポートしています。
                    </p>
                  </div>
                  <div className="pb-4 border-b">
                    <h4 className="font-semibold mb-2">健康管理</h4>
                    <p className="text-sm text-gray-700">
                      看護師による健康チェックを実施しています。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">見学・体験</h4>
                    <p className="text-sm text-gray-700">
                      随時、見学や体験を受け付けております。
                      お気軽にお問い合わせください。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="facility-hikari border-2">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">見学・体験のお申し込み</h3>
            <p className="text-gray-700 mb-6">
              HIKARIでは、随時見学や体験を受け付けております。<br />
              まずはお気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${FACILITIES.hikari.tel}`} className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                <Phone size={20} className="mr-2" />
                電話で問い合わせ
              </a>
              <a href={`mailto:${FACILITIES.hikari.email}`} className="inline-flex items-center justify-center px-6 py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors">
                <Mail size={20} className="mr-2" />
                メールで問い合わせ
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

