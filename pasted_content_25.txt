import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Heart, Clock, MapPin, Mail, Phone, CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { Link } from "wouter";

export default function Recruit() {
  const jobPositions = [
    {
      title: "生活支援員",
      facility: "HIKARI（生活介護）",
      type: "正社員・パート",
      description: "利用者様の日常生活支援を通じて、充実した毎日をサポートしていただきます。",
      requirements: [
        "福祉関連の資格をお持ちの方（社会福祉士、介護福祉士、精神保健福祉士など）",
        "未経験者も歓迎（研修制度あり）",
        "利用者様に寄り添える方"
      ],
      icon: Heart,
      color: "bg-lime-50 border-lime-200",
    },
    {
      title: "就労支援員",
      facility: "MIRAI・studio M（就労継続支援B型）",
      type: "正社員・パート",
      description: "利用者様の就労支援を通じて、自立した生活を目指すサポートをしていただきます。",
      requirements: [
        "福祉関連の資格をお持ちの方",
        "就労支援の経験がある方優遇",
        "コミュニケーション能力のある方"
      ],
      icon: Briefcase,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "サービス管理責任者",
      facility: "全事業所",
      type: "正社員",
      description: "サービスの質の向上と利用者様の個別支援計画の作成・管理を担当していただきます。",
      requirements: [
        "サービス管理責任者研修修了者",
        "実務経験3年以上",
        "マネジメント経験のある方優遇"
      ],
      icon: Users,
      color: "bg-amber-50 border-amber-200",
    },
  ];

  const benefits = [
    { title: "社会保険完備", description: "健康保険、厚生年金、雇用保険、労災保険" },
    { title: "研修制度", description: "入社時研修、定期研修、資格取得支援" },
    { title: "昇給・賞与", description: "年1回の昇給、年2回の賞与（業績による）" },
    { title: "有給休暇", description: "法定通りの有給休暇、慶弔休暇" },
    { title: "交通費支給", description: "上限3万円まで全額支給" },
    { title: "退職金制度", description: "勤続3年以上で退職金制度あり" },
  ];

  const recruitmentFlow = [
    { step: 1, title: "応募", description: "応募フォームまたはメールでご応募ください" },
    { step: 2, title: "書類選考", description: "履歴書・職務経歴書を確認させていただきます" },
    { step: 3, title: "面接", description: "1〜2回の面接を実施します" },
    { step: 4, title: "内定", description: "合格者には内定通知をお送りします" },
    { step: 5, title: "入社", description: "入社日を調整し、研修を開始します" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage="recruit" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-blue-50 to-cyan-50 py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Briefcase className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">求人・採用情報</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              一緒に利用者様の未来を支えませんか？
              <br />
              未来ネットワークでは、情熱を持って働ける仲間を募集しています。
            </p>
          </div>
        </div>
      </section>

      {/* Job Positions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">募集職種</h2>
            <p className="text-lg text-muted-foreground">
              現在募集中の職種をご紹介します
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {jobPositions.map((job, index) => (
              <Card key={index} className={`${job.color} border-2 hover:shadow-xl transition-all duration-300`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-white">
                      <job.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm font-semibold text-primary">
                    {job.facility}
                  </CardDescription>
                  <CardDescription className="text-sm">
                    {job.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">応募資格:</p>
                    <ul className="space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">福利厚生・待遇</h2>
            <p className="text-lg text-muted-foreground">
              働きやすい環境を整えています
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">勤務条件</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">勤務時間</p>
                      <p className="text-sm text-muted-foreground">9:00〜18:00（休憩1時間）</p>
                      <p className="text-sm text-muted-foreground">※シフト制、パートは応相談</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">勤務地</p>
                      <p className="text-sm text-muted-foreground">東京都昭島市内の各事業所</p>
                      <p className="text-sm text-muted-foreground">（MIRAI、HIKARI、studio M）</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recruitment Flow Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">採用の流れ</h2>
            <p className="text-lg text-muted-foreground">
              応募から入社までのステップをご紹介します
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* 縦線 */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>

              <div className="space-y-8">
                {recruitmentFlow.map((flow, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* ステップ番号 */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                      {flow.step}
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 pt-3">
                      <h3 className="text-xl font-bold mb-2">{flow.title}</h3>
                      <p className="text-muted-foreground">{flow.description}</p>
                    </div>

                    {/* 矢印 */}
                    {index < recruitmentFlow.length - 1 && (
                      <ArrowRight className="hidden md:block absolute left-8 top-20 w-6 h-6 text-primary/40 transform -translate-x-1/2 rotate-90" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-blue-50 to-cyan-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">応募方法</h2>
            <p className="text-lg text-muted-foreground mb-8">
              ご応募は以下の方法で受け付けております。
              <br />
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Mail className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle>メールで応募</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    履歴書・職務経歴書を添付してお送りください
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="mailto:info@mirainetwork2017.com">
                      メールを送信
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Phone className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle>電話で問い合わせ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    お気軽にお電話でお問い合わせください
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="tel:042-519-2942">
                      042-519-2942
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">応募書類</h3>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>履歴書（写真貼付）</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>職務経歴書</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>資格証明書のコピー（お持ちの方）</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">私たちと一緒に働きませんか？</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              未来ネットワークでは、利用者様一人ひとりの個性を大切にし、
              <br />
              自立した生活と社会参加を支援しています。
              <br />
              <br />
              あなたの経験とスキルを活かして、
              <br />
              利用者様の未来を一緒に創りませんか？
              <br />
              <br />
              未経験の方も、丁寧な研修制度でサポートいたします。
              <br />
              まずはお気軽にお問い合わせください。
            </p>
            <Button size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                トップページへ戻る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
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
                  <Link href="/" className="hover:text-white transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    法人概要
                  </Link>
                </li>
                <li>
                  <Link href="/recruit" className="hover:text-white transition-colors">
                    求人・採用
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">お問い合わせ</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:info@mirainetwork2017.com" className="hover:text-white transition-colors">
                    info@mirainetwork2017.com
                  </a>
                </li>
                <li>
                  <a href="tel:042-519-2942" className="hover:text-white transition-colors">
                    042-519-2942
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

