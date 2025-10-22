import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, Heart, Users } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Link } from "wouter";

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
    color: "bg-yellow-50 text-yellow-800 border-yellow-200",
    icon: Building2,
  },
  mirai: {
    label: "MIRAI",
    color: "bg-blue-50 text-blue-800 border-blue-200",
    icon: Building2,
  },
  hikari: {
    label: "HIKARI",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: Heart,
  },
  studio_m: {
    label: "studio M",
    color: "bg-purple-50 text-purple-800 border-purple-200",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-16 text-center">
        <p className="text-muted-foreground text-lg">現在、お知らせはありません</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {announcements.map((announcement) => {
        const config = facilityConfig[announcement.facility];
        const Icon = config.icon;
        const date = announcement.publishedAt || announcement.createdAt;
        const hasImages = announcement.images && announcement.images.length > 0;

        return (
          <Link key={announcement.id} href={`/announcements/${announcement.id}`}>
            <Card className="hover:shadow-md transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col bg-white">
              {/* Featured Image */}
              {hasImages && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={announcement.images?.[0] || ''}
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <CardContent className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className={`${config.color} border text-xs font-medium`}>
                    {config.label}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(new Date(date), "yyyy/MM/dd", { locale: ja })}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {announcement.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

