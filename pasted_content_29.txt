import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Announcement {
  id: string;
  title: string;
  content: string;
  facility: string;
  authorId: string;
  createdAt: string;
  status: string;
}

export default function AdminApprovals() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");


  useEffect(() => {
    fetchPendingAnnouncements();
  }, []);

  const fetchPendingAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements/pending");
      if (!response.ok) throw new Error("Failed to fetch pending announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error: any) {
      toast.error(error.message || "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/announcements/${id}/approve`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to approve announcement");

      toast.success("お知らせを承認しました");

      fetchPendingAnnouncements();
    } catch (error: any) {
      toast.error(error.message || "承認に失敗しました");
    }
  };

  const handleReject = async () => {
    if (!selectedAnnouncement) return;

    try {
      const response = await fetch(`/api/announcements/${selectedAnnouncement.id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectionReason }),
      });

      if (!response.ok) throw new Error("Failed to reject announcement");

      toast.success("お知らせを却下しました");

      setRejectDialogOpen(false);
      setSelectedAnnouncement(null);
      setRejectionReason("");
      fetchPendingAnnouncements();
    } catch (error: any) {
      toast.error(error.message || "却下に失敗しました");
    }
  };

  const getFacilityName = (facility: string) => {
    const facilities: Record<string, string> = {
      organization: "法人",
      mirai: "MIRAI",
      hikari: "HIKARI",
      studio_m: "studio M",
    };
    return facilities[facility] || facility;
  };

  const getFacilityColor = (facility: string) => {
    const colors: Record<string, string> = {
      organization: "bg-yellow-100 text-yellow-700",
      mirai: "bg-blue-100 text-blue-700",
      hikari: "bg-lime-100 text-lime-700",
      studio_m: "bg-orange-100 text-orange-700",
    };
    return colors[facility] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">承認待ちお知らせ</h2>
        <p className="text-gray-600">事業所管理者が作成したお知らせを承認・却下します</p>
      </div>

      {announcements.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">承認待ちのお知らせはありません</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded ${getFacilityColor(announcement.facility)}`}>
                        {getFacilityName(announcement.facility)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(announcement.createdAt).toLocaleDateString("ja-JP")}
                      </span>
                    </div>
                    <CardTitle>{announcement.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{announcement.content}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(announcement.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    承認して公開
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedAnnouncement(announcement);
                      setRejectDialogOpen(true);
                    }}
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    却下
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>お知らせを却下</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">却下理由</Label>
              <Textarea
                id="reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="却下する理由を入力してください"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              キャンセル
            </Button>
            <Button onClick={handleReject} className="bg-red-600 hover:bg-red-700">
              却下する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

