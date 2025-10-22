import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit, Upload } from "lucide-react";
import { toast } from "sonner";

interface GalleryItem {
  id: string;
  facility: "mirai" | "hikari" | "studio_m";
  title: string;
  description: string | null;
  imageUrl: string;
  category: "work" | "activity" | "program" | "event";
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminGallery() {
  const { user } = useAuth();
  const { getAccessibleFacilities, canAccessFacility } = usePermissions();
  const accessibleFacilities = getAccessibleFacilities();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    facility: "mirai" as "mirai" | "hikari" | "studio_m",
    title: "",
    description: "",
    category: "work" as "work" | "activity" | "program" | "event",
    imageFile: null as File | null,
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setGalleryItems(data);
    } catch (error) {
      toast.error("ギャラリーの読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("画像のアップロードに失敗しました");
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("ログインしてください");
      return;
    }

    if (!formData.imageFile && !editingItem) {
      toast.error("画像を選択してください");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = editingItem?.imageUrl || "";

      if (formData.imageFile) {
        imageUrl = await handleImageUpload(formData.imageFile);
      }

      const payload = {
        facility: formData.facility,
        title: formData.title,
        description: formData.description || null,
        imageUrl,
        category: formData.category,
        uploadedBy: user.id,
      };

      if (editingItem) {
        const response = await fetch(`/api/gallery/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description || null,
            category: formData.category,
          }),
        });

        if (!response.ok) throw new Error("更新に失敗しました");
        toast.success("ギャラリーを更新しました");
      } else {
        const response = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("作成に失敗しました");
        toast.success("ギャラリーを作成しました");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchGalleryItems();
    } catch (error: any) {
      toast.error(error.message || "エラーが発生しました");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("削除に失敗しました");

      toast.success("ギャラリーを削除しました");
      fetchGalleryItems();
    } catch (error: any) {
      toast.error(error.message || "削除に失敗しました");
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      facility: item.facility,
      title: item.title,
      description: item.description || "",
      category: item.category,
      imageFile: null,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      facility: "mirai",
      title: "",
      description: "",
      category: "work",
      imageFile: null,
    });
  };

  const getFacilityLabel = (facility: string) => {
    switch (facility) {
      case "mirai": return "MIRAI";
      case "hikari": return "HIKARI";
      case "studio_m": return "studio M";
      default: return facility;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "work": return "作業";
      case "activity": return "活動";
      case "program": return "プログラム";
      case "event": return "イベント";
      default: return category;
    }
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">ギャラリー管理</h2>
          <p className="text-muted-foreground">作業・活動写真を管理します</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新規追加
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "ギャラリー編集" : "新規ギャラリー追加"}</DialogTitle>
              <DialogDescription>
                作業や活動の写真をアップロードします
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label>事業所</Label>
                  <Select
                    value={formData.facility}
                    onValueChange={(value: any) => setFormData({ ...formData, facility: value })}
                    disabled={!!editingItem}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accessibleFacilities.includes("mirai") && <SelectItem value="mirai">MIRAI</SelectItem>}
                      {accessibleFacilities.includes("hikari") && <SelectItem value="hikari">HIKARI</SelectItem>}
                      {accessibleFacilities.includes("studio_m") && <SelectItem value="studio_m">studio M</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>カテゴリ</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">作業</SelectItem>
                      <SelectItem value="activity">活動</SelectItem>
                      <SelectItem value="program">プログラム</SelectItem>
                      <SelectItem value="event">イベント</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>タイトル</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="例: 製品組み立て作業"
                    required
                  />
                </div>

                <div>
                  <Label>説明（任意）</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="写真の説明を入力してください"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>画像</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setFormData({ ...formData, imageFile: file });
                    }}
                    required={!editingItem}
                  />
                  {editingItem && (
                    <p className="text-sm text-muted-foreground mt-1">
                      画像を変更しない場合は選択不要です
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  キャンセル
                </Button>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "アップロード中..." : editingItem ? "更新" : "作成"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {galleryItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary">
                      {getFacilityLabel(item.facility)}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-secondary">
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </div>
              {item.description && (
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  編集
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  削除
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {galleryItems.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">まだギャラリーがありません</p>
          <p className="text-sm text-muted-foreground">「新規追加」ボタンから写真をアップロードしてください</p>
        </div>
      )}
    </div>
  );
}

