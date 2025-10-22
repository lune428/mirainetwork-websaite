import { useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Megaphone, Image, FileText, CheckSquare, Users, History } from "lucide-react";
import AdminAnnouncements from "./AdminAnnouncements";
import AdminGallery from "@/components/AdminGallery";
import AdminPageContent from "@/components/AdminPageContent";
import AdminApprovals from "@/components/AdminApprovals";
import AdminUsers from "@/components/AdminUsers";
import AdminAuditLog from "@/components/AdminAuditLog";
import { useUser } from "@/hooks/use-user";

export default function AdminCMS() {
  const [activeTab, setActiveTab] = useState("announcements");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="admin" />

      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">コンテンツ管理システム</h1>
          <p className="text-muted-foreground">
            お知らせ、ギャラリー、ページコンテンツを一括で管理できます
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              お知らせ管理
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              ギャラリー管理
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              ページコンテンツ
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              承認待ち
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              ユーザー管理
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              監査ログ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements">
            <AdminAnnouncements />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>

          <TabsContent value="content">
            <AdminPageContent />
          </TabsContent>

          <TabsContent value="approvals">
            <AdminApprovals />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsers />
          </TabsContent>

          <TabsContent value="audit">
            <AdminAuditLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

