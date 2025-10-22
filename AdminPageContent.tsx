import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";

interface PageContentItem {
  id: string;
  facility: "mirai" | "hikari" | "studio_m";
  section: string;
  content: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const SECTIONS = {
  mirai: [
    { value: "description", label: "事業所説明" },
    { value: "work_content", label: "作業内容" },
    { value: "daily_schedule", label: "一日の流れ" },
  ],
  hikari: [
    { value: "description", label: "事業所説明" },
    { value: "programs", label: "プログラム内容" },
    { value: "activities", label: "活動内容" },
  ],
  studio_m: [
    { value: "description", label: "事業所説明" },
    { value: "work_content", label: "作業内容" },
    { value: "support", label: "支援内容" },
  ],
};

export default function AdminPageContent() {
  const { user } = useAuth();
  const { getAccessibleFacilities, canAccessFacility } = usePermissions();
  const accessibleFacilities = getAccessibleFacilities();
  const [selectedFacility, setSelectedFacility] = useState<"mirai" | "hikari" | "studio_m">("mirai");
  const [selectedSection, setSelectedSection] = useState("description");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [selectedFacility, selectedSection]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/page-content/${selectedFacility}/${selectedSection}`);
      
      if (response.ok) {
        const data = await response.json();
        setContent(data.content);
        setContentId(data.id);
      } else if (response.status === 404) {
        // Content not found, start with empty
        setContent("");
        setContentId(null);
      } else {
        throw new Error("コンテンツの読み込みに失敗しました");
      }
    } catch (error: any) {
      if (error.message !== "コンテンツの読み込みに失敗しました") {
        setContent("");
        setContentId(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("ログインしてください");
      return;
    }

    if (!content.trim()) {
      toast.error("コンテンツを入力してください");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        facility: selectedFacility,
        section: selectedSection,
        content: content.trim(),
        updatedBy: user.id,
      };

      const response = await fetch("/api/page-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("保存に失敗しました");

      const data = await response.json();
      setContentId(data.id);
      toast.success("コンテンツを保存しました");
    } catch (error: any) {
      toast.error(error.message || "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  const getFacilityLabel = (facility: string) => {
    switch (facility) {
      case "mirai": return "MIRAI";
      case "hikari": return "HIKARI";
      case "studio_m": return "studio M";
      default: return facility;
    }
  };

  const currentSections = SECTIONS[selectedFacility];
  const currentSectionLabel = currentSections.find(s => s.value === selectedSection)?.label || selectedSection;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">ページコンテンツ編集</h2>
        <p className="text-muted-foreground">各事業所のページ内容を編集します</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div>
          <Label>事業所を選択</Label>
          <Select
            value={selectedFacility}
            onValueChange={(value: any) => {
              setSelectedFacility(value);
              const sections = SECTIONS[value as keyof typeof SECTIONS];
              setSelectedSection(sections[0].value);
            }}
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
          <Label>セクションを選択</Label>
          <Select
            value={selectedSection}
            onValueChange={setSelectedSection}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currentSections.map((section) => (
                <SelectItem key={section.value} value={section.value}>
                  {section.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {getFacilityLabel(selectedFacility)} - {currentSectionLabel}
          </CardTitle>
          <CardDescription>
            このセクションの内容を編集してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">読み込み中...</div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>コンテンツ</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="コンテンツを入力してください"
                  rows={15}
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Markdown形式で記述できます。改行は自動的に反映されます。
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "保存中..." : "保存"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">💡 使い方のヒント</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 各事業所のページに表示される内容をここで編集できます</li>
          <li>• 変更は保存ボタンを押すまで反映されません</li>
          <li>• Markdown形式で見出しやリストを使用できます</li>
          <li>• 例: ## 見出し、- リスト項目、**太字**</li>
        </ul>
      </div>
    </div>
  );
}

