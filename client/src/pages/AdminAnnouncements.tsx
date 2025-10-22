import { useUser } from "@/hooks/use-user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  Edit,
  Trash2,
  Eye,
  Plus,
  Building2,
  Heart,
  Users as UsersIcon,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/Header";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id: number;
  title: string;
  content: string;
  facility: "corporate" | "mirai" | "hikari" | "studio_m";
  isPublished: "draft" | "pending" | "published" | "rejected";
  authorId: string;
  createdAt: string;
  publishedAt: string | null;
  updatedAt: string;
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
    icon: UsersIcon,
  },
};

const statusConfig = {
  draft: {
    label: "下書き",
    color: "bg-gray-100 text-gray-800",
    icon: Edit,
  },
  pending: {
    label: "承認待ち",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  published: {
    label: "公開中",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  rejected: {
    label: "却下",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function AdminAnnouncements() {
  const { user, isAuthenticated } = useUser();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isAdmin = user?.role === "admin";
  const userFacility = user?.facility;

  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ["/api/admin/announcements"],
    enabled: isAuthenticated,
  });

  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/announcements/${id}/approve`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("承認に失敗しました");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/announcements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "承認しました",
        description: "お知らせが公開されました。",
      });
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "承認に失敗しました。",
        variant: "destructive",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/announcements/${id}/reject`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("却下に失敗しました");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/announcements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "却下しました",
        description: "お知らせを却下しました。",
      });
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "却下に失敗しました。",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("削除に失敗しました");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/announcements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "削除しました",
        description: "お知らせを削除しました。",
      });
    },
    onError: () => {
      toast({
        title: "エラー",
        description: "削除に失敗しました。",
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>ログインが必要です</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/auth/login")} className="w-full">
              ログイン
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter announcements based on user role
  const filteredAnnouncements = announcements?.filter((announcement) => {
    if (isAdmin) return true; // Admin can see all
    return announcement.facility === userFacility; // Facility admin can only see their facility
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin">
            <ArrowLeft className="w-4 h-4 mr-2" />
            ダッシュボードに戻る
          </Link>
        </Button>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">お知らせ管理</h1>
            <p className="text-muted-foreground">
              お知らせの作成・編集・承認を行います
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/announcements/new">
              <Plus className="w-4 h-4 mr-2" />
              新規作成
            </Link>
          </Button>
        </div>

        {/* Announcements List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredAnnouncements && filteredAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => {
              const facilityInfo = facilityConfig[announcement.facility];
              const statusInfo = statusConfig[announcement.isPublished];
              const FacilityIcon = facilityInfo.icon;
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant="outline" className={`${facilityInfo.color} border`}>
                            <FacilityIcon className="w-3 h-3 mr-1" />
                            {facilityInfo.label}
                          </Badge>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {format(new Date(announcement.createdAt), "yyyy年MM月dd日", { locale: ja })}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {announcement.content}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {isAdmin && announcement.isPublished === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => approveMutation.mutate(announcement.id)}
                              disabled={approveMutation.isPending}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              承認
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => rejectMutation.mutate(announcement.id)}
                              disabled={rejectMutation.isPending}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              却下
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <Link href={`/admin/announcements/${announcement.id}/edit`}>
                            <Edit className="w-4 h-4 mr-1" />
                            編集
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (confirm("本当に削除しますか？")) {
                              deleteMutation.mutate(announcement.id);
                            }
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">お知らせがありません</p>
              <Button asChild>
                <Link href="/admin/announcements/new">
                  <Plus className="w-4 h-4 mr-2" />
                  新規作成
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

