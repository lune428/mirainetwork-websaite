import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Target, Heart, Users, Shield, TrendingUp, Globe, User, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage="about" />

      {/* ヒーローセクション - モダンなデザイン */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold tracking-wider">ABOUT US</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              未来ネットワークについて
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 leading-relaxed font-light mb-8">
              縁（つながり）を力に変え、<br />
              誰もが安心して働き・暮らせる<br className="md:hidden" />未来を創る
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <div className="w-12 h-px bg-blue-300"></div>
              <span className="text-sm">Our Mission</span>
              <div className="w-12 h-px bg-blue-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 代表メッセージ - エレガントなデザイン */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* 左側: プロフィール */}
              <div className="md:col-span-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-20 blur-2xl"></div>
                  <div className="relative bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
                    <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                      <User className="w-20 h-20 text-white" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        北村 陽朗
                      </h3>
                      <p className="text-gray-600 mb-1">
                        代表理事
                      </p>
                      <p className="text-sm text-gray-500">
                        Hiiro Kitamura
                      </p>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500">設立</p>
                        <p className="text-sm font-semibold text-gray-700">2016年7月</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右側: メッセージ */}
              <div className="md:col-span-3">
                <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  Message
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                  一人ひとりの<br />
                  「あたりまえの幸せ」に<br />
                  寄り添います
                </h2>
                
                <div className="space-y-5 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    私たちは、障害を持った方々が地域で安心して暮らし、働くことができる社会の実現を目指しています。
                  </p>
                  <p>
                    2016年の法人設立以来、「縁（つながり）を力に変える」という想いのもと、
                    利用者様一人ひとりの個性と希望を大切にし、その人らしい生活を支援してきました。
                  </p>
                  <p>
                    現在、3つの事業所（MIRAI、HIKARI、studio M）を運営し、
                    就労継続支援B型と生活介護のサービスを通じて、多くの方々の「あたりまえの幸せ」を支えています。
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-l-4 border-blue-500">
                    <p className="font-semibold text-blue-900">
                      今後も事業所の展開、多角的な展開を目指し、障害を持った方々はもちろん、
                      法人の職員の生活を豊かに、雇用を守るために、法人をスケールアップしていきます。
                    </p>
                  </div>
                  <p className="text-gray-600">
                    私たちと共に、誰もが安心して働き・暮らせる未来を創っていきましょう。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 沿革 - タイムラインデザイン */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                History
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                沿革
              </h2>
              <p className="text-gray-600">私たちの歩み</p>
            </div>

            <div className="relative">
              {/* 中央の線 */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-indigo-300 to-purple-200 transform -translate-x-1/2 hidden md:block"></div>

              {/* タイムラインアイテム */}
              <div className="space-y-16">
                {[
                  { year: "2016", month: "7月", event: "一般社団法人未来ネットワーク 設立", color: "blue" },
                  { year: "2017", month: "1月", event: "東京都昭島市に就労継続支援B型事業所「MIRAI」開設", color: "indigo" },
                  { year: "2019", month: "", event: "昭島市に生活介護事業所「HIKARI」開設", color: "purple" },
                  { year: "2022", month: "", event: "昭島市に就労継続支援B型事業所「studio M」開設", color: "pink" },
                  { year: "2025", month: "", event: "3事業所で障害福祉サービスを展開中", color: "green" },
                ].map((item, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* ドット */}
                    <div className="absolute left-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10 hidden md:block"></div>
                    
                    {/* コンテンツ */}
                    <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                        <div className={`inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-bold text-lg mb-4 shadow-md`}>
                          {item.year}{item.month && `年${item.month}`}
                        </div>
                        <p className="text-gray-800 text-lg leading-relaxed">{item.event}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future - 未来への展望 */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold">
                Future
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                未来への展望
              </h2>
              <p className="text-gray-600 text-lg">私たちが目指す未来</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: TrendingUp,
                  title: "事業所の拡大",
                  description: "より多くの方々に質の高いサービスを提供するため、新たな事業所の開設を計画しています",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Globe,
                  title: "多角的な展開",
                  description: "福祉サービスの枠を超え、地域社会に新しい価値を提供する事業を創出します",
                  gradient: "from-indigo-500 to-purple-500"
                },
                {
                  icon: Heart,
                  title: "豊かな生活の実現",
                  description: "利用者様と職員の双方が、安心して働き、豊かに暮らせる環境を創ります",
                  gradient: "from-purple-500 to-pink-500"
                }
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-10 blur-2xl"></div>
              <div className="relative bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-gray-100">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed text-center">
                  私たちは、<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">障害を持った方々の生活を豊かにする</span>ことはもちろん、
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">法人の職員の雇用を守り、安定した生活を支える</span>ことも重要な使命と考えています。
                  <br /><br />
                  そのために、法人をスケールアップし、より多くの方々に希望と安心を届けられる組織へと成長していきます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 法人理念 - モダンなカードデザイン */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Philosophy
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                法人理念
              </h2>
              <p className="text-gray-600 text-lg">私たちの価値観と約束</p>
            </div>

            {/* ミッション */}
            <div className="mb-20">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl opacity-20 blur-2xl"></div>
                <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Target className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      法人ミッション
                    </h3>
                  </div>
                  <p className="text-2xl md:text-3xl leading-relaxed font-bold mb-6">
                    「縁（つながり）を力に変え、<br />
                    誰もが安心して働き・暮らせる未来を創る」
                  </p>
                  <p className="text-lg text-blue-100">
                    — 一人ひとりの尊厳と選択を守り、地域と共に新しい価値を生み出します。
                  </p>
                </div>
              </div>
            </div>

            {/* ビジョン */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                法人ビジョン
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    number: "01",
                    title: "未来を拓く法人",
                    description: "社会課題に正面から向き合い、果敢に新しい事業・活動に挑みます。",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    number: "02",
                    title: "希望の拠点",
                    description: "福祉を起点に、働くこと・暮らすことで得られる経験と、地域との連携が有機的に結びつき、誰もが豊かさと希望を持てる場を創造します。",
                    gradient: "from-indigo-500 to-purple-500"
                  },
                  {
                    number: "03",
                    title: "笑顔の循環",
                    description: "利用者と職員の双方が安心と誇りを感じ、満足度を高めながら、地域社会全体に笑顔を広げる好循環を築きます。",
                    gradient: "from-purple-500 to-pink-500"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                      <div className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient} mb-4`}>
                        {item.number}
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* バリュー */}
            <div className="mb-20">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                法人バリュー
              </h3>
              <p className="text-gray-600 text-center mb-12">核となる3原則</p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Heart, title: "信頼", subtitle: "Trust", description: "互いを信じ合い、安心できる関係を築きます。", color: "red" },
                  { icon: Shield, title: "誠実", subtitle: "Integrity", description: "正直さと一貫性をもって、透明で公正な行動を続けます。", color: "blue" },
                  { icon: Users, title: "謙虚", subtitle: "Humility", description: "心から謙虚であること。自分の足りなさを認め、隣にいる人の長所に目を向け、感謝を忘れません。", color: "green" }
                ].map((item, index) => (
                  <div key={index} className="group relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-300`}></div>
                    <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 group-hover:border-transparent">
                      <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                      </div>
                      <h5 className="text-2xl font-bold text-gray-800 mb-2">
                        {item.title}
                      </h5>
                      <p className="text-sm text-gray-500 mb-4 font-semibold">
                        {item.subtitle}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4つの行動指針 */}
              <h4 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                実践における4つの行動指針
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "尊厳と公平", description: "すべての人の人権を守り、ライフステージに応じた支援を大切にします。" },
                  { title: "挑戦と創造", description: "常に変化を恐れず、新しい試みに果敢に挑みます。" },
                  { title: "地域との共生", description: "地域社会と共に歩み、支え合い、新しい価値を共創します。" },
                  { title: "共に挑み、成長する", description: "挑戦を続け、利用者・職員・地域とともに夢や希望を育みます。" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="text-lg font-bold text-gray-800 mb-2">
                        {item.title}
                      </h5>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 未来Core */}
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl opacity-20 blur-2xl"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                      未来 Core
                    </h3>
                    <p className="text-indigo-100 text-lg mb-4">
                      私たちが大切にする4つの約束
                    </p>
                    <div className="max-w-3xl mx-auto">
                      <p className="text-indigo-50 leading-relaxed">
                        この4つの原則は、2016年の法人設立時から変わることなく大切にしてきた、私たちの根本理念です。<br />
                        時代が変わっても、事業が拡大しても、この「未来Core」は私たちの活動の中心であり続けます。
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { number: "01", title: "希望の実現", description: "おひとりおひとりの希望をできる限り叶えます。" },
                      { number: "02", title: "尊厳の尊重", description: "尊厳を守り、その人の個性と人生を尊重し、その人らしさを守ります。" },
                      { number: "03", title: "虐待・人権侵害の防止", description: "虐待・差別・人権侵害を決して許しません。" },
                      { number: "04", title: "福祉接遇マナーの徹底", description: "礼節ある言葉と態度で信頼を築きます。" }
                    ].map((item, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                        <div className="text-4xl font-bold text-white/40 mb-3">{item.number}</div>
                        <h5 className="text-xl font-bold mb-3">{item.title}</h5>
                        <p className="text-indigo-100">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 法人概要 */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                Overview
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                法人概要
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-10 md:p-14">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { label: "法人名", value: "一般社団法人未来ネットワーク" },
                      { label: "設立", value: "2016年7月" },
                      { label: "代表理事", value: "北村 陽朗" },
                      { label: "所在地", value: "東京都昭島市" },
                      { label: "事業内容", value: ["就労継続支援B型事業（MIRAI、studio M）", "生活介護事業（HIKARI）", "障害福祉サービス事業"] },
                      { label: "事業所", value: ["MIRAI（就労継続支援B型）", "HIKARI（生活介護）", "studio M（就労継続支援B型）"] }
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="py-6 pr-8 text-gray-600 font-bold whitespace-nowrap align-top text-lg">
                          {row.label}
                        </td>
                        <td className="py-6 text-gray-800">
                          {Array.isArray(row.value) ? (
                            <ul className="space-y-2">
                              {row.value.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-600 mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            row.value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/">
                  <a>運営事業所を見る</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - 一緒に未来を創りませんか */}
      <section className="py-24 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              一緒に未来を創りませんか？
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              見学・ご相談はいつでも承っております。<br />
              お気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/#contact">
                  <a className="flex items-center gap-2">
                    お問い合わせ
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/>
                      <path d="m12 5 7 7-7 7"/>
                    </svg>
                  </a>
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <Link href="/">
                  <a>トップページへ</a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

