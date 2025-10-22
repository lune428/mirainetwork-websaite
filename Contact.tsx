import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().optional(),
  facility: z.enum(["mirai", "hikari", "studio_m"]),
  inquiryType: z.enum(["visit", "trial", "consultation", "other"]),
  message: z.string().min(1, "メッセージを入力してください"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location] = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // URLクエリパラメータから事業所を取得して事前選択
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const facilityParam = searchParams.get('facility');
    
    if (facilityParam && ['mirai', 'hikari', 'studio_m'].includes(facilityParam)) {
      setValue('facility', facilityParam as any, { shouldValidate: true });
    }
  }, [location, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("送信に失敗しました");
      }

      toast({
        title: "送信完了",
        description: "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。",
        variant: "default",
      });

      reset();
    } catch (error) {
      toast({
        title: "エラー",
        description: "送信に失敗しました。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const facilityLabels = {
    mirai: "MIRAI",
    hikari: "HIKARI",
    studio_m: "studio M",
  };

  const inquiryTypeLabels = {
    visit: "見学希望",
    trial: "体験希望",
    consultation: "利用相談",
    other: "その他",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">お問い合わせ</CardTitle>
                <CardDescription>
                  見学・体験のご希望やご質問など、お気軽にお問い合わせください
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* お名前 */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      お名前 <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="山田 太郎"
                        className="pl-10"
                        {...register("name")}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* メールアドレス */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      メールアドレス <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@example.com"
                        className="pl-10"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  {/* 電話番号 */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">電話番号（任意）</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="090-1234-5678"
                        className="pl-10"
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  {/* お問い合わせ先事業所 */}
                  <div className="space-y-2">
                    <Label htmlFor="facility">
                      お問い合わせ先事業所 <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      onValueChange={(value) => setValue("facility", value as any)}
                      defaultValue={new URLSearchParams(window.location.search).get('facility') || undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="事業所を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(facilityLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.facility && (
                      <p className="text-sm text-red-500">{errors.facility.message}</p>
                    )}
                  </div>

                  {/* お問い合わせ内容 */}
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => setValue("inquiryType", value as any)}>
                      <SelectTrigger>
                        <SelectValue placeholder="お問い合わせ内容を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(inquiryTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.inquiryType && (
                      <p className="text-sm text-red-500">{errors.inquiryType.message}</p>
                    )}
                  </div>

                  {/* メッセージ */}
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      メッセージ <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="お問い合わせ内容をご記入ください"
                      rows={6}
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* 送信ボタン */}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>送信中...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        送信する
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* 各事業所の連絡先情報 */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">MIRAI</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  <p>TEL: 042-519-2942</p>
                  <p>営業時間: 9:00-16:45</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">HIKARI</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  <p>TEL: 042-519-1905</p>
                  <p>営業時間: 8:30-17:30</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">studio M</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  <p>TEL: 042-519-7916</p>
                  <p>営業時間: 9:00-16:45</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

