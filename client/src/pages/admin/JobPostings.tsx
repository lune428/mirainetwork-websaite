import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobPosting {
  id: number;
  facility: string;
  title: string;
  employmentType: string;
  jobDescription: string;
  baseSalary: string;
  workSchedule: string;
  holidays: string;
  socialInsurance: string;
  contractPeriod: string;
  isPublished: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function JobPostingsAdmin() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await fetch("/api/admin/jobpostings", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch job postings");
      const data = await response.json();
      setJobPostings(data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
      toast.error("募集職種の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("この募集職種を削除してもよろしいですか?")) return;

    try {
      const response = await fetch(`/api/admin/jobpostings?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to delete job posting");

      toast.success("募集職種を削除しました");
      fetchJobPostings();
    } catch (error) {
      console.error("Error deleting job posting:", error);
      toast.error("募集職種の削除に失敗しました");
    }
  };

  const togglePublish = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/jobpostings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isPublished: !currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to update job posting");

      toast.success(`募集職種を${!currentStatus ? "公開" : "非公開"}にしました`);
      fetchJobPostings();
    } catch (error) {
      console.error("Error updating job posting:", error);
      toast.error("募集職種の更新に失敗しました");
    }
  };

  const getFacilityLabel = (facility: string) => {
    const labels: Record<string, string> = {
      corporate: "法人全体",
      mirai: "MIRAI",
      hikari: "HIKARI",
      studio_m: "studio M",
    };
    return labels[facility] || facility;
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
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setLocation("/admin")}>
            ← 管理画面に戻る
          </Button>
          <h1 className="text-3xl font-bold">募集職種管理</h1>
        </div>
        <Button onClick={() => setLocation("/admin/job-postings/new")}>
          <Plus className="mr-2 h-4 w-4" />
          新規作成
        </Button>
      </div>

      {jobPostings.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-gray-500">
            募集職種がありません。新規作成してください。
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobPostings.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {getFacilityLabel(job.facility)}
                      </span>
                      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {job.employmentType}
                      </span>
                      {job.isPublished ? (
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                          公開中
                        </span>
                      ) : (
                        <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                          非公開
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublish(job.id, job.isPublished)}
                    >
                      {job.isPublished ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(`/admin/job-postings/${job.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">仕事内容:</span>{" "}
                    <span className="text-gray-600">
                      {job.jobDescription.substring(0, 100)}
                      {job.jobDescription.length > 100 && "..."}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">基本給:</span>{" "}
                    <span className="text-gray-600">{job.baseSalary}</span>
                  </div>
                  <div>
                    <span className="font-semibold">勤務形態:</span>{" "}
                    <span className="text-gray-600">{job.workSchedule}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

