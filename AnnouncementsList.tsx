import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, Heart, Users } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface Announcement {
  id: number;
  title: string;
  content: string;
  facility: "corporate" | "mirai" | "hikari" | "studio_m";
  isPublished: string;
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

export default function AnnouncementsList() {
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
    queryFn: async () => {
      const response = await fetch("/api/announcements");
      if (!response.ok) {
        throw new Error("お知らせの取得に失敗しました");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">現在、お知らせはありません。</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => {
        const config = facilityConfig[announcement.facility];
        const Icon = config.icon;
        const date = announcement.publishedAt || announcement.createdAt;

        return (
          <Card
            key={announcement.id}
            className="hover:shadow-lg transition-shadow duration-300 border-2"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`${config.color} border`}>
                      <Icon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {format(new Date(date), "yyyy年MM月dd日", { locale: ja })}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{announcement.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed whitespace-pre-wrap">
                {announcement.content}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

