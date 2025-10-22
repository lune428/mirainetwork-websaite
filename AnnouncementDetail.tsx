import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link, useParams } from "wouter";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const { data: announcements, isLoading } = trpc.announcements.list.useQuery({ publishedOnly: true });

  const announcement = announcements?.find((a: any) => a.id === id);

  const facilityNames: Record<string, string> = {
    organization: "法人",
    mirai: "MIRAI",
    hikari: "HIKARI",
    studio_m: "studio M",
  };

  const getFacilityColor = (facility: string) => {
    const colors: Record<string, string> = {
      organization: "bg-yellow-100 text-yellow-700",
      mirai: "bg-blue-100 text-blue-700",
      hikari: "bg-lime-100 text-lime-700",
      studio_m: "bg-orange-100 text-orange-700",
    };
    return colors[facility] || "bg-gray-100 text-gray-700";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="home" />
        <div className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto">
            <Card className="animate-pulse">
              <CardContent className="p-8">
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-8"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header currentPage="home" />
        <div className="container mx-auto py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">お知らせが見つかりません</h1>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = announcement.imageUrls ? JSON.parse(announcement.imageUrls) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="home" />
      
      <div className="container mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              お知らせ一覧に戻る
            </Button>
          </Link>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getFacilityColor(announcement.facility)}`}>
                  {facilityNames[announcement.facility] || announcement.facility}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-6">{announcement.title}</h1>

              {images.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((url: string, idx: number) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`お知らせ画像 ${idx + 1}`}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                  {announcement.content}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

