import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { 
  Bell, 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle,
  Plus,
  Settings,
  LayoutDashboard,
  Briefcase,
  Gift
} from "lucide-react";
import Header from "@/components/Header";

interface DashboardStats {
  totalAnnouncements: number;
  pendingApproval: number;
  published: number;
  draft: number;
}

export default function Admin() {
  const { user, isAuthenticated, loading } = useUser();
  const [, setLocation] = useLocation();

  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated,
  });

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  const isAdmin = user?.role === "admin";
  const isFacilityAdmin = user?.role?.includes("_admin");

  if (!isAdmin && !isFacilityAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>アクセス権限がありません</CardTitle>
            <CardDescription>
              この画面にアクセスする権限がありません。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/")} className="w-full">
              ホームに戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">管理画面</h1>
          <p className="text-muted-foreground">
            {isAdmin ? "法人管理者" : "事業所管理者"} - {user?.name}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                総お知らせ数
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalAnnouncements || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                承認待ち
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats?.pendingApproval || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                公開中
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats?.published || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                下書き
              </CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {stats?.draft || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/announcements">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Bell className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>お知らせ管理</CardTitle>
                    <CardDescription>
                      お知らせの作成・編集・承認
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/announcements/new">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>新規お知らせ作成</CardTitle>
                    <CardDescription>
                      新しいお知らせを投稿
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/job-postings">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Briefcase className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>募集職種管理</CardTitle>
                    <CardDescription>
                      求人情報の作成・編集
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/benefits">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <Gift className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <CardTitle>福利厚生管理</CardTitle>
                    <CardDescription>
                      福利厚生・待遇の編集
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>

          {isAdmin && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/admin/users/register">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>ユーザー登録</CardTitle>
                      <CardDescription>
                        新しい管理者アカウントを作成
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

