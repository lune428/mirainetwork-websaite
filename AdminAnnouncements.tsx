import { useState } from "react";
import { toast } from "sonner";
import { Edit, Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import Header from "@/components/Header";

// Mock useAuth hook for development
const useAuth = () => ({
  user: { id: "admin", role: "admin" },
  loading: false,
  isAuthenticated: true,
});

export default function AdminAnnouncements() {
  const { user, loading, isAuthenticated } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    facility: "organization" as "organization" | "mirai" | "hikari" | "studio_m",
    isPublished: "draft" as "draft" | "published",
    imageUrls: [] as string[],
  });

  const { data: announcements, refetch } = trpc.announcements.list.useQuery({ publishedOnly: false });
  const createMutation = trpc.announcements.create.useMutation();
  const updateMutation = trpc.announcements.update.useMutation();
  const deleteMutation = trpc.announcements.delete.useMutation();

  const utils = trpc.useUtils();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>アクセス権限がありません</CardTitle>
            <CardDescription>この機能は管理者のみ利用できます。</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // 画像アップロード処理（ファイルシステムに保存）
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // ファイルサイズチェック（5MB以下）
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("5MB以下の画像を選択してください");
      return;
    }

    setIsUploading(true);
    toast.info("画像をアップロード中...");

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload/multiple', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('アップロードに失敗しました');
      }

      const result = await response.json();
      
      if (result.success && result.files) {
        const uploadedUrls = result.files.map((f: any) => f.url);
        
        setImagePreviewUrls(prev => [...prev, ...uploadedUrls]);
        setFormData(prev => ({
          ...prev,
          imageUrls: [...prev.imageUrls, ...uploadedUrls],
        }));
        
        toast.success(`${files.length}枚の画像をアップロードしました`);
      } else {
        throw new Error('アップロード結果が不正です');
      }
    } catch (error) {
      toast.error("画像のアップロードに失敗しました");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      facility: "organization",
      isPublished: "draft",
      imageUrls: [],
    });
    setImagePreviewUrls([]);
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.content) {
      toast.error("タイトルと内容を入力してください");
      return;
    }

    try {
      await createMutation.mutateAsync({
        title: formData.title,
        content: formData.content,
        facility: formData.facility,
        isPublished: formData.isPublished,
        imageUrls: formData.imageUrls,
      });

      toast.success("お知らせを作成しました");
      setIsCreateDialogOpen(false);
      resetForm();
      utils.announcements.list.invalidate();
    } catch (error) {
      toast.error("作成に失敗しました");
      console.error(error);
    }
  };

  const handleEdit = (announcement: any) => {
    setEditingAnnouncement(announcement);
    const existingImages = announcement.imageUrls ? JSON.parse(announcement.imageUrls) : [];
    setFormData({
      title: announcement.title,
      content: announcement.content,
      facility: announcement.facility,
      isPublished: announcement.isPublished,
      imageUrls: existingImages,
    });
    setImagePreviewUrls(existingImages);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingAnnouncement || !formData.title || !formData.content) {
      toast.error("タイトルと内容を入力してください");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: editingAnnouncement.id,
        title: formData.title,
        content: formData.content,
        facility: formData.facility,
        isPublished: formData.isPublished,
        imageUrls: formData.imageUrls,
      });

      toast.success("お知らせを更新しました");
      setIsEditDialogOpen(false);
      resetForm();
      setEditingAnnouncement(null);
      utils.announcements.list.invalidate();
    } catch (error) {
      toast.error("更新に失敗しました");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("このお知らせを削除してもよろしいですか？")) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("お知らせを削除しました");
      utils.announcements.list.invalidate();
    } catch (error) {
      toast.error("削除に失敗しました");
    }
  };

  const getFacilityLabel = (facility: string) => {
    switch (facility) {
      case "organization": return "法人";
      case "mirai": return "MIRAI";
      case "hikari": return "HIKARI";
      case "studio_m": return "studio M";
      default: return facility;
    }
  };

  const getFacilityBadgeColor = (facility: string) => {
    switch (facility) {
      case "organization": return "bg-yellow-100 text-yellow-700";
      case "mirai": return "bg-blue-100 text-blue-700";
      case "hikari": return "bg-lime-100 text-lime-700";
      case "studio_m": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const renderFormDialog = (isEdit: boolean) => (
    <Dialog open={isEdit ? isEditDialogOpen : isCreateDialogOpen} onOpenChange={isEdit ? setIsEditDialogOpen : setIsCreateDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "お知らせを編集" : "新しいお知らせを作成"}</DialogTitle>
          <DialogDescription>
            お知らせの内容を編集してください
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              placeholder="お知らせのタイトル"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="content">内容</Label>
            <Textarea
              id="content"
              placeholder="お知らせの内容"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
            />
          </div>

          <div>
            <Label htmlFor="facility">対象事業所</Label>
            <Select value={formData.facility} onValueChange={(value: any) => setFormData(prev => ({ ...prev, facility: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organization">法人</SelectItem>
                <SelectItem value="mirai">MIRAI</SelectItem>
                <SelectItem value="hikari">HIKARI</SelectItem>
                <SelectItem value="studio_m">studio M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="isPublished">公開状態</Label>
            <Select value={formData.isPublished} onValueChange={(value: any) => setFormData(prev => ({ ...prev, isPublished: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">下書き</SelectItem>
                <SelectItem value="published">公開</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="images">画像（任意、最大10枚、各5MB以下）</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">クリックして画像をアップロード</span>
                  <span className="text-gray-500 block text-sm">複数選択可能（JPG, PNG, GIF）</span>
                </Label>
                <Input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>
            </div>

            {/* 画像プレビュー */}
            {imagePreviewUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`プレビュー ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => {
            if (isEdit) {
              setIsEditDialogOpen(false);
              setEditingAnnouncement(null);
            } else {
              setIsCreateDialogOpen(false);
            }
            resetForm();
          }}>
            キャンセル
          </Button>
          <Button onClick={isEdit ? handleUpdate : handleCreate} disabled={isUploading}>
            {isUploading ? "アップロード中..." : (isEdit ? "更新" : "作成")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">お知らせ管理</h1>
            <p className="text-gray-600 mt-1">お知らせの作成・編集・削除ができます</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            新規作成
          </Button>
        </div>

        <div className="grid gap-4">
          {announcements?.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFacilityBadgeColor(announcement.facility)}`}>
                        {getFacilityLabel(announcement.facility)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.isPublished === "published" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {announcement.isPublished === "published" ? "公開中" : "下書き"}
                      </span>
                    </div>
                    <CardTitle>{announcement.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {announcement.content.substring(0, 100)}
                      {announcement.content.length > 100 && "..."}
                    </CardDescription>
                    <p className="text-sm text-gray-500 mt-2">
                      作成日: {new Date(announcement.createdAt).toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(announcement)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(announcement.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}

          {(!announcements || announcements.length === 0) && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">お知らせがまだありません</p>
                <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  最初のお知らせを作成
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {renderFormDialog(false)}
      {renderFormDialog(true)}
    </div>
  );
}

