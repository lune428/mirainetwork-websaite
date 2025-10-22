import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Calendar } from "lucide-react";
import { Link } from "wouter";

export default function AnnouncementsList() {
  const { data: announcements, isLoading } = trpc.announcements.list.useQuery({ publishedOnly: true });

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-slate-200"></div>
            <CardContent className="p-6">
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          現在、お知らせはありません
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {announcements.slice(0, 6).map((announcement) => {
        const images = announcement.imageUrls ? JSON.parse(announcement.imageUrls) : [];
        const thumbnailImage = images.length > 0 ? images[0] : null;

        return (
          <Link key={announcement.id} href={`/announcements/${announcement.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full overflow-hidden">
              {thumbnailImage && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={thumbnailImage}
                    alt={announcement.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${getFacilityColor(announcement.facility)}`}>
                    {facilityNames[announcement.facility] || announcement.facility}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString("ja-JP")}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{announcement.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{announcement.content}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

