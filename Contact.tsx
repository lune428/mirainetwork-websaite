import { useState } from "react";
import { Mail, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    facility: "",
    inquiryType: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const facilities = [
    { value: "mirai", label: "MIRAI（就労継続支援B型）", icon: Mail, email: "info@mirainetwork2017.com" },
    { value: "hikari", label: "HIKARI（生活介護）", icon: Mail, email: "hikarinet2019@gmail.com" },
    { value: "studiom", label: "studio M（就労継続支援B型）", icon: Mail, email: "info@studiom.jp" },
  ];

  const inquiryTypes = [
    { value: "visit", label: "見学希望" },
    { value: "trial", label: "体験希望" },
    { value: "consultation", label: "利用相談" },
    { value: "other", label: "その他" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 選択された事業所のメールアドレスを取得
    const selectedFacility = facilities.find(f => f.value === formData.facility);
    const toEmail = selectedFacility?.email || "info@mirainetwork2017.com";

    // メール本文を作成
    const subject = `【お問い合わせ】${selectedFacility?.label || "未来ネットワーク"}`;
    const body = `
お名前: ${formData.name}
メールアドレス: ${formData.email}
電話番号: ${formData.phone || "未記入"}
お問い合わせ先: ${selectedFacility?.label || "未選択"}
お問い合わせ内容: ${inquiryTypes.find(t => t.value === formData.inquiryType)?.label || "未選択"}

メッセージ:
${formData.message}
    `.trim();

    // mailto: リンクを使用してメールアプリを開く
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    // フォーム送信完了状態に設定
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img src="/logo.png" alt="未来ネットワーク" className="h-12 w-12" />
                  <div>
                    <div className="font-bold text-lg text-gray-800">一般社団法人未来ネットワーク</div>
                    <div className="text-xs text-gray-600">障害福祉サービス</div>
                  </div>
                </a>
              </Link>
              <nav className="hidden md:flex gap-6">
                <Link href="/"><a className="text-gray-600 hover:text-blue-600 transition-colors">ホーム</a></Link>
                <Link href="/about"><a className="text-gray-600 hover:text-blue-600 transition-colors">未来ネットワークについて</a></Link>
                <Link href="/mirai"><a className="text-gray-600 hover:text-blue-600 transition-colors">MIRAI</a></Link>
                <Link href="/hikari"><a className="text-gray-600 hover:text-blue-600 transition-colors">HIKARI</a></Link>
                <Link href="/studio-m"><a className="text-gray-600 hover:text-blue-600 transition-colors">studio M</a></Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                メールアプリが開きました
              </h1>
              <p className="text-gray-600 mb-8">
                お使いのメールアプリで内容をご確認の上、送信してください。<br />
                メールアプリが開かない場合は、直接以下のメールアドレスにお問い合わせください。
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">お問い合わせ先メールアドレス</p>
                <p className="text-lg font-semibold text-blue-600">
                  {facilities.find(f => f.value === formData.facility)?.email || "info@mirainetwork2017.com"}
                </p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/">
                    <a>トップページに戻る</a>
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    facility: "",
                    inquiryType: "",
                    message: "",
                  });
                }}>
                  もう一度入力する
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="未来ネットワーク" className="h-12 w-12" />
                <div>
                  <div className="font-bold text-lg text-gray-800">一般社団法人未来ネットワーク</div>
                  <div className="text-xs text-gray-600">障害福祉サービス</div>
                </div>
              </a>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/"><a className="text-gray-600 hover:text-blue-600 transition-colors">ホーム</a></Link>
              <Link href="/about"><a className="text-gray-600 hover:text-blue-600 transition-colors">未来ネットワークについて</a></Link>
              <Link href="/mirai"><a className="text-gray-600 hover:text-blue-600 transition-colors">MIRAI</a></Link>
              <Link href="/hikari"><a className="text-gray-600 hover:text-blue-600 transition-colors">HIKARI</a></Link>
              <Link href="/studio-m"><a className="text-gray-600 hover:text-blue-600 transition-colors">studio M</a></Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            CONTACT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            お問い合わせ
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            見学や体験、ご利用に関するご相談など、<br />
            お気軽にお問い合わせください
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">お問い合わせフォーム</CardTitle>
                <CardDescription>
                  以下のフォームに必要事項をご記入の上、送信してください。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* お名前 */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="山田 太郎"
                    />
                  </div>

                  {/* メールアドレス */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="example@email.com"
                    />
                  </div>

                  {/* 電話番号 */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="090-1234-5678"
                    />
                  </div>

                  {/* お問い合わせ先事業所 */}
                  <div>
                    <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ先事業所 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="facility"
                      name="facility"
                      required
                      value={formData.facility}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">選択してください</option>
                      {facilities.map((facility) => (
                        <option key={facility.value} value={facility.value}>
                          {facility.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* お問い合わせ内容 */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">選択してください</option>
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* メッセージ */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      メッセージ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="お問い合わせ内容をご記入ください"
                    />
                  </div>

                  {/* 送信ボタン */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? (
                        <>処理中...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          送信する
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                    >
                      <Link href="/">
                        <a>キャンセル</a>
                      </Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {facilities.map((facility) => (
                <Card key={facility.value} className="text-center">
                  <CardHeader>
                    <facility.icon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                    <CardTitle className="text-lg">{facility.label.split("（")[0]}</CardTitle>
                    <CardDescription className="text-xs">
                      {facility.label.match(/（(.+)）/)?.[1]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      {facility.email}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

