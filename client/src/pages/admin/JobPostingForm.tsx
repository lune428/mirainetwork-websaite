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

interface JobPostingFormData {
  facility: string;
  title: string;
  employmentType: string;
  jobDescription: string;
  baseSalary: string;
  workSchedule: string;
  holidays: string;
  socialInsurance: string;
  contractPeriod: string;
  isPublished: boolean;
}

export default function JobPostingForm() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<JobPostingFormData>({
    facility: "corporate",
    title: "",
    employmentType: "",
    jobDescription: "",
    baseSalary: "",
    workSchedule: "",
    holidays: "",
    socialInsurance: "",
    contractPeriod: "",
    isPublished: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchJobPosting();
    }
  }, [id]);

  const fetchJobPosting = async () => {
    try {
      const response = await fetch(`/api/job-postings/${id}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch job posting");
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching job posting:", error);
      toast({
        title: "エラー",
        description: "募集職種の取得に失敗しました",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit
        ? `/api/admin/job_postings/${id}`
        : "/api/admin/job_postings";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save job posting");

      toast({
        title: "成功",
        description: `募集職種を${isEdit ? "更新" : "作成"}しました`,
      });
      setLocation("/admin/job-postings");
    } catch (error) {
      console.error("Error saving job posting:", error);
      toast({
        title: "エラー",
        description: `募集職種の${isEdit ? "更新" : "作成"}に失敗しました`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof JobPostingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => setLocation("/admin/job-postings")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        戻る
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? "募集職種を編集" : "新規募集職種を作成"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="facility">事業所 *</Label>
              <Select
                value={formData.facility}
                onValueChange={(value) => handleChange("facility", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="事業所を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">法人全体</SelectItem>
                  <SelectItem value="mirai">MIRAI</SelectItem>
                  <SelectItem value="hikari">HIKARI</SelectItem>
                  <SelectItem value="studio_m">studio M</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">職種名 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="例: 生活支援員"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employmentType">雇用形態 *</Label>
              <Input
                id="employmentType"
                value={formData.employmentType}
                onChange={(e) => handleChange("employmentType", e.target.value)}
                placeholder="例: 正社員・パート"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">仕事の内容 *</Label>
              <Textarea
                id="jobDescription"
                value={formData.jobDescription}
                onChange={(e) => handleChange("jobDescription", e.target.value)}
                placeholder="仕事の内容を詳しく記載してください"
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseSalary">基本給 *</Label>
              <Input
                id="baseSalary"
                value={formData.baseSalary}
                onChange={(e) => handleChange("baseSalary", e.target.value)}
                placeholder="例: 月給 250,000円〜300,000円"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="workSchedule">勤務形態 *</Label>
              <Textarea
                id="workSchedule"
                value={formData.workSchedule}
                onChange={(e) => handleChange("workSchedule", e.target.value)}
                placeholder="例: 8:30〜17:30（休憩1時間）"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="holidays">休日・休暇 *</Label>
              <Textarea
                id="holidays"
                value={formData.holidays}
                onChange={(e) => handleChange("holidays", e.target.value)}
                placeholder="例: 週休2日制（土日祝）、年末年始、夏季休暇、有給休暇"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialInsurance">社会保険 *</Label>
              <Input
                id="socialInsurance"
                value={formData.socialInsurance}
                onChange={(e) => handleChange("socialInsurance", e.target.value)}
                placeholder="例: 健康保険、厚生年金、雇用保険、労災保険"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractPeriod">契約期間 *</Label>
              <Input
                id="contractPeriod"
                value={formData.contractPeriod}
                onChange={(e) => handleChange("contractPeriod", e.target.value)}
                placeholder="例: 期間の定めなし"
                required
              />
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
                onClick={() => setLocation("/admin/job-postings")}
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

