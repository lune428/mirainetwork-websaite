import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

interface BenefitFormData {
  title: string;
  description: string;
  category: string;
  isPublished: boolean;
}

export default function BenefitForm() {
  const params = useParams();
  const id = params.id;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<BenefitFormData>({
    title: "",
    description: "",
    category: "welfare",
    isPublished: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchBenefit();
    }
  }, [id]);

  const fetchBenefit = async () => {
    try {
      const response = await fetch(`/api/benefits`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch benefits");
      const data = await response.json();
      const benefit = data.find((b: any) => b.id === parseInt(id!));
      if (benefit) {
        setFormData(benefit);
      }
    } catch (error) {
      console.error("Error fetching benefit:", error);
      toast({
        title: "エラー",
        description: "福利厚生情報の取得に失敗しました",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit
        ? `/api/admin/benefits/${id}`
        : "/api/admin/benefits";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save benefit");

      toast({
        title: "成功",
        description: `福利厚生項目を${isEdit ? "更新" : "作成"}しました`,
      });
      setLocation("/admin/benefits");
    } catch (error) {
      console.error("Error saving benefit:", error);
      toast({
        title: "エラー",
        description: `福利厚生項目の${isEdit ? "更新" : "作成"}に失敗しました`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BenefitFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => setLocation("/admin/benefits")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        戻る
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>
            {isEdit ? "福利厚生項目を編集" : "新規福利厚生項目を作成"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">項目名 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="例: 社会保険完備"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明（任意）</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="福利厚生の詳細説明を記載してください"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">カテゴリ *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="welfare">福利厚生</SelectItem>
                  <SelectItem value="insurance">保険</SelectItem>
                  <SelectItem value="allowance">手当</SelectItem>
                  <SelectItem value="facility">施設・設備</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) => handleChange("isPublished", e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="isPublished" className="cursor-pointer">
                公開する
              </Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "保存中..." : isEdit ? "更新する" : "作成する"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation("/admin/benefits")}
              >
                キャンセル
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

