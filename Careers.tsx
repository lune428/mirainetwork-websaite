import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import { 
  Briefcase, 
  Heart, 
  CheckCircle, 
  Mail, 
  Phone,
  Home,
  Syringe,
  Calendar,
  Gift,
  Award,
  ShoppingBag
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface JobPosting {
  id: number;
  facility: string;
  title: string;
  employmentType: string;
  jobDescription: string;
  baseSalary: string;
  workSchedule: string;
  holidays: string;
  socialInsurance: string;
  contractPeriod: string;
  isPublished: boolean;
}

interface Benefit {
  id: number;
  title: string;
  description: string | null;
  category: string;
  displayOrder: number;
  isPublished: boolean;
}

export default function Careers() {
  const { data: jobPostings, isLoading: jobsLoading } = useQuery<JobPosting[]>({
    queryKey: ["/api/job-postings"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/job-postings");
        if (!response.ok) {
          console.warn("Failed to fetch job postings:", response.status);
          return [];
        }
        return response.json();
      } catch (error) {
        console.warn("Error fetching job postings:", error);
        return [];
      }
    },
  });

  const { data: benefitsData, isLoading: benefitsLoading } = useQuery<Benefit[]>({
    queryKey: ["/api/benefits"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/benefits");
        if (!response.ok) {
          console.warn("Failed to fetch benefits:", response.status);
          return [];
        }
        return response.json();
      } catch (error) {
        console.warn("Error fetching benefits:", error);
        return [];
      }
    },
  });

  // Get icon for category
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      welfare: Gift,
      insurance: Syringe,
      allowance: Home,
      facility: ShoppingBag,
      other: Award,
    };
    return icons[category] || CheckCircle;
  };

  const recruitmentProcess = [
    {
      step: "1",
      title: "応募",
      description: "応募フォームまたはメールでご応募ください"
    },
    {
      step: "2",
      title: "書類選考",
      description: "履歴書・職務経歴書を確認させていただきます"
    },
    {
      step: "3",
      title: "面接",
      description: "1〜2回の面接を実施します"
    },
    {
      step: "4",
      title: "内定",
      description: "合格者には内定通知をお送りします"
    },
    {
      step: "5",
      title: "入社",
      description: "入社日を調整し、研修を開始します"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <title>{`求人・採用 - ${APP_TITLE}`}</title>
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
              <Briefcase className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">求人・採用情報</h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              一緒に利用者様の未来を支えませんか？
            </p>
            <p className="text-lg text-muted-foreground">
              未来ネットワークでは、情熱を持って働ける仲間を募集しています。
            </p>
          </div>
        </div>
      </section>

      {/* Job Postings Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">募集職種</h2>
            <p className="text-lg text-muted-foreground">
              現在募集中の職種をご紹介します
            </p>
          </div>

          {jobsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">読み込み中...</p>
            </div>
          ) : jobPostings && jobPostings.length > 0 ? (
            <div className="grid gap-8 max-w-4xl mx-auto">
              {jobPostings.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {job.facility === "mirai" ? "MIRAI" : job.facility === "hikari" ? "HIKARI" : job.facility === "studio_m" ? "studio M" : "法人全体"}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                        {job.employmentType}
                      </span>
                    </div>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          仕事の内容
                        </h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{job.jobDescription}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">基本給</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">{job.baseSalary}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">勤務形態</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">{job.workSchedule}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">休日・休暇</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">{job.holidays}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">社会保険</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">{job.socialInsurance}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">契約期間</h4>
                          <p className="text-muted-foreground whitespace-pre-wrap">{job.contractPeriod}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">現在、募集中の職種はありません。</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">福利厚生・待遇</h2>
            <p className="text-lg text-muted-foreground">
              働きやすい環境を整えています
            </p>
          </div>

          {benefitsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">読み込み中...</p>
            </div>
          ) : benefitsData && benefitsData.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {benefitsData.map((benefit) => {
                const IconComponent = getCategoryIcon(benefit.category);
                return (
                  <Card key={benefit.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{benefit.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {benefit.description || ""}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">福利厚生情報がありません。</p>
            </div>
          )}
        </div>
      </section>

      {/* Recruitment Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">採用の流れ</h2>
            <p className="text-lg text-muted-foreground">
              応募から入社までのステップをご紹介します
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {recruitmentProcess.map((process, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {process.step}
                  </div>
                  {index < recruitmentProcess.length - 1 && (
                    <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">応募方法</h2>
            <p className="text-lg text-muted-foreground mb-2">
              ご応募は以下の方法で受け付けております。
            </p>
            <p className="text-muted-foreground">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <div className="mb-6">
                <Mail className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">メールで応募</h3>
                <p className="text-sm text-muted-foreground">
                  履歴書・職務経歴書を添付してお送りください
                </p>
              </div>
              <Button asChild className="w-full">
                <a href="mailto:info@mirai-network.jp">
                  メールを送信
                </a>
              </Button>
            </Card>

            <Card className="text-center p-8">
              <div className="mb-6">
                <Phone className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">電話で問い合わせ</h3>
                <p className="text-sm text-muted-foreground">
                  お気軽にお電話でお問い合わせください
                </p>
              </div>
              <Button variant="outline" asChild className="w-full">
                <a href="tel:042-519-2942">
                  042-519-2942
                </a>
              </Button>
            </Card>
          </div>

          <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-sm">
            <h4 className="font-semibold mb-3">応募書類</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                履歴書（写真貼付）
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                職務経歴書
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                資格証明書のコピー（お持ちの方）
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              私たちと一緒に働きませんか？
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              未来ネットワークでは、利用者様一人ひとりの個性を大切にし、
              自立した生活と社会参加を支援しています。
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              あなたの経験とスキルを活かして、
              利用者様の未来を一緒に創りませんか？
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              未経験の方も、丁寧な研修制度でサポートいたします。
              まずはお気軽にお問い合わせください。
            </p>
            <Button size="lg" asChild>
              <a href="#top">
                トップページへ戻る
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8 mt-auto">
        <div className="container text-center">
          <p className="text-sm">
            © 2016-2025 一般社団法人未来ネットワーク All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

