import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Benefit {
  id: number;
  title: string;
  description: string | null;
  category: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BenefitsAdmin() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const response = await fetch("/api/admin/benefits", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch benefits");
      const data = await response.json();
      setBenefits(data);
    } catch (error) {
      console.error("Error fetching benefits:", error);
      toast({
        title: "エラー",
        description: "福利厚生情報の取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("この福利厚生項目を削除してもよろしいですか?")) return;

    try {
      const response = await fetch(`/api/admin/benefits/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete benefit");

      toast({
        title: "成功",
        description: "福利厚生項目を削除しました",
      });
      fetchBenefits();
    } catch (error) {
      console.error("Error deleting benefit:", error);
      toast({
        title: "エラー",
        description: "福利厚生項目の削除に失敗しました",
        variant: "destructive",
      });
    }
  };

  const togglePublish = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/benefits/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update benefit");

      toast({
        title: "成功",
        description: `福利厚生項目を${!currentStatus ? "公開" : "非公開"}にしました`,
      });
      fetchBenefits();
    } catch (error) {
      console.error("Error updating benefit:", error);
      toast({
        title: "エラー",
        description: "福利厚生項目の更新に失敗しました",
        variant: "destructive",
      });
    }
  };

  const moveItem = async (id: number, direction: "up" | "down") => {
    const currentIndex = benefits.findIndex((b) => b.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === benefits.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newBenefits = [...benefits];
    [newBenefits[currentIndex], newBenefits[newIndex]] = [
      newBenefits[newIndex],
      newBenefits[currentIndex],
    ];

    // Update display orders
    try {
      await Promise.all(
        newBenefits.map((benefit, index) =>
          fetch(`/api/admin/benefits/${benefit.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ displayOrder: index }),
          })
        )
      );

      setBenefits(newBenefits);
      toast({
        title: "成功",
        description: "表示順序を更新しました",
      });
    } catch (error) {
      console.error("Error updating order:", error);
      toast({
        title: "エラー",
        description: "表示順序の更新に失敗しました",
        variant: "destructive",
      });
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      welfare: "福利厚生",
      insurance: "保険",
      allowance: "手当",
      facility: "施設・設備",
      other: "その他",
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">福利厚生・待遇管理</h1>
        <Button onClick={() => setLocation("/admin/benefits/new")}>
          <Plus className="mr-2 h-4 w-4" />
          新規作成
        </Button>
      </div>

      {benefits.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            福利厚生項目がありません。新規作成してください。
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {benefits.map((benefit, index) => (
            <Card key={benefit.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {getCategoryLabel(benefit.category)}
                      </span>
                      {benefit.isPublished ? (
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          公開中
                        </span>
                      ) : (
                        <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          非公開
                        </span>
                      )}
                    </div>
                    {benefit.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {benefit.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveItem(benefit.id, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveItem(benefit.id, "down")}
                      disabled={index === benefits.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublish(benefit.id, benefit.isPublished)}
                    >
                      {benefit.isPublished ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/admin/benefits/${benefit.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(benefit.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

