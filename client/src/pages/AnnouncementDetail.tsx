import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, Heart, Users, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Header from "@/components/Header";

interface Announcement {
  id: number;
  title: string;
  content: string;
  facility: "corporate" | "mirai" | "hikari" | "studio_m";
  isPublished: string;
  images?: string[];
  createdAt: string;
  publishedAt: string | null;
}

const facilityConfig = {
  corporate: {
    label: "法人全体",
    color: "bg-gray-100 text-gray-800 border-gray-300",
    icon: Building2,
  },
  mirai: {
    label: "MIRAI",
    color: "bg-sky-100 text-sky-800 border-sky-300",
    icon: Building2,
  },
  hikari: {
    label: "HIKARI",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: Heart,
  },
  studio_m: {
    label: "studio M",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: Users,
  },
};

export default function AnnouncementDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const id = params.id;

  const { data: announcement, isLoading, error } = useQuery<Announcement>({
    queryKey: [`/api/announcements/${id}`],
    queryFn: async () => {
      const response = await fetch(`/api/announcements/${id}`);
      if (!response.ok) {
        throw new Error("お知らせの取得に失敗しました");
      }
      return response.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Card className="animate-pulse">
            <div className="h-96 bg-gray-200"></div>
            <CardHeader>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-lg">お知らせが見つかりませんでした</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const config = facilityConfig[announcement.facility];
  const Icon = config.icon;
  const date = announcement.publishedAt || announcement.createdAt;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => setLocation("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          戻る
        </Button>

        <Card className="border-2 overflow-hidden">
          {/* Featured Images */}
          {announcement.images && announcement.images.length > 0 && (
            <div className="w-full">
              {announcement.images.map((image, index) => (
                <div key={index} className="w-full overflow-hidden">
                  <img
                    src={image}
                    alt={`${announcement.title} - 画像${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className={`${config.color} border`}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {format(new Date(date), "yyyy年MM月dd日", { locale: ja })}
              </div>
            </div>
            <CardTitle className="text-3xl">{announcement.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-base leading-relaxed whitespace-pre-wrap">
              {announcement.content}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

