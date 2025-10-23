import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useLocation, useParams } from "wouter";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { ArrowLeft, Save, Send, Upload, X } from "lucide-react";

interface AnnouncementFormData {
  title: string;
  content: string;
  facility: "corporate" | "mirai" | "hikari" | "studio_m";
  images?: string[];
}

export default function AdminAnnouncementForm() {
  const { user, isAuthenticated, loading } = useUser();
  const [, setLocation] = useLocation();
  const params = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const announcementId = params.id ? parseInt(params.id) : null;
  const isEdit = !!announcementId;

  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    content: "",
    facility: user?.facility || "corporate",
    images: [],
  });

  const [uploadingImages, setUploadingImages] = useState(false);

  const isAdmin = user?.role === "admin";

  // Fetch existing announcement if editing
  const { data: announcement } = useQuery<AnnouncementFormData & { id: number }>({
    queryKey: [`/api/admin/announcements/${announcementId}`],
    enabled: isEdit && isAuthenticated,
  });

  useEffect(() => {
    if (announcement) {
      // Parse images from JSON string if needed
      let parsedImages: string[] = [];
      if (announcement.images) {
        if (typeof announcement.images === 'string') {
          try {
            parsedImages = JSON.parse(announcement.images);
          } catch (e) {
            console.error('Failed to parse images:', e);
            parsedImages = [];
          }
        } else if (Array.isArray(announcement.images)) {
          parsedImages = announcement.images;
        }
      }
      
      setFormData({
        title: announcement.title,
        content: announcement.content,
        facility: announcement.facility,
        images: parsedImages,
      });
    }
  }, [announcement]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    try {
      const formDataUpload = new FormData();
      Array.from(files).forEach((file) => {
        formDataUpload.append("images", file);
      });

      const response = await fetch("/api/upload/images", {
        method: "POST",
        body: formDataUpload,
      });

      if (!response.ok) throw new Error("画像のアップロードに失敗しました");

      const data = await response.json();
      setFormData({
        ...formData,
        images: [...(formData.images || []), ...data.urls],
      });

      toast.success(`${files.length}枚の画像をアップロードしました`);
    } catch (error) {
      toast.error("画像のアップロードに失敗しました");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index) || [],
    });
  };

  const saveDraftMutation = useMutation({
    mutationFn: async () => {
      const url = isEdit
        ? `/api/admin/announcements/${announcementId}`
        : "/api/admin/announcements";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          isPublished: "draft",
        }),
      });

      if (!response.ok) throw new Error("保存に失敗しました");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/announcements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast.success("お知らせを下書きとして保存しました");
      setLocation("/admin/announcements");
    },
    onError: () => {
      toast.error("保存に失敗しました");
    },
  });

  const submitForApprovalMutation = useMutation({
    mutationFn: async () => {
      const url = isEdit
        ? `/api/admin/announcements/${announcementId}`
        : "/api/admin/announcements";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          isPublished: isAdmin ? "published" : "pending",
        }),
      });

      if (!response.ok) throw new Error("送信に失敗しました");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/announcements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast.success(isAdmin ? "お知らせを公開しました" : "お知らせを承認待ちとして送信しました");
      setLocation("/admin/announcements");
    },
    onError: () => {
      toast.error("送信に失敗しました");
    },
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>ログインが必要です</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/login")} className="w-full">
              ログイン
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/admin/announcements")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-3xl font-bold mb-2">
            {isEdit ? "お知らせ編集" : "新規お知らせ作成"}
          </h1>
          <p className="text-muted-foreground">
            お知らせの内容を入力してください
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6">
            <form className="space-y-6">
              {/* Facility Selection */}
              <div className="space-y-2">
                <Label htmlFor="facility">事業所</Label>
                <Select
                  value={formData.facility}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, facility: value })
                  }
                  disabled={!isAdmin}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">法人全体</SelectItem>
                    <SelectItem value="mirai">MIRAI</SelectItem>
                    <SelectItem value="hikari">HIKARI</SelectItem>
                    <SelectItem value="studio_m">studio M</SelectItem>
                  </SelectContent>
                </Select>
                {!isAdmin && (
                  <p className="text-sm text-muted-foreground">
                    事業所管理者は自分の事業所のみ選択できます
                  </p>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">タイトル</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="お知らせのタイトルを入力"
                  required
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">内容</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="お知らせの内容を入力"
                  rows={10}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>画像（最大5枚）</Label>
                <div className="space-y-4">
                  {/* Uploaded Images Preview */}
                  {formData.images && formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  {(!formData.images || formData.images.length < 5) && (
                    <div>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImages}
                      />
                      <label htmlFor="image-upload">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          disabled={uploadingImages}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("image-upload")?.click();
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploadingImages ? "アップロード中..." : "画像を選択"}
                        </Button>
                      </label>
                      <p className="text-sm text-muted-foreground mt-2">
                        JPEG, PNG, GIF, WebP形式（最大5MB）
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => saveDraftMutation.mutate()}
                  disabled={
                    saveDraftMutation.isPending ||
                    submitForApprovalMutation.isPending ||
                    !formData.title ||
                    !formData.content
                  }
                >
                  <Save className="w-4 h-4 mr-2" />
                  下書き保存
                </Button>
                <Button
                  type="button"
                  onClick={() => submitForApprovalMutation.mutate()}
                  disabled={
                    saveDraftMutation.isPending ||
                    submitForApprovalMutation.isPending ||
                    !formData.title ||
                    !formData.content
                  }
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isAdmin ? "公開する" : "承認申請"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

