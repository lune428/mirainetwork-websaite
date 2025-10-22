import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { History, User, FileText, Image, Users } from "lucide-react";

interface AuditLog {
  id: string;
  userId: string;
  userName: string | null;
  action: string;
  entityType: string;
  entityId: string;
  facility: string | null;
  changes: string | null;
  createdAt: string;
}

export default function AdminAuditLog() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      const response = await fetch("/api/audit-log");
      if (!response.ok) throw new Error("Failed to fetch audit logs");
      const data = await response.json();
      setLogs(data);
    } catch (error: any) {
      toast.error(error.message || "監査ログの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const getActionName = (action: string) => {
    const actions: Record<string, string> = {
      create: "作成",
      update: "更新",
      delete: "削除",
      approve: "承認",
      reject: "却下",
    };
    return actions[action] || action;
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      create: "text-green-600",
      update: "text-blue-600",
      delete: "text-red-600",
      approve: "text-green-600",
      reject: "text-red-600",
    };
    return colors[action] || "text-gray-600";
  };

  const getEntityTypeName = (entityType: string) => {
    const types: Record<string, string> = {
      announcement: "お知らせ",
      gallery: "ギャラリー",
      pageContent: "ページコンテンツ",
      user: "ユーザー",
    };
    return types[entityType] || entityType;
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case "announcement":
        return <FileText className="h-4 w-4" />;
      case "gallery":
        return <Image className="h-4 w-4" />;
      case "pageContent":
        return <FileText className="h-4 w-4" />;
      case "user":
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getFacilityName = (facility: string | null) => {
    if (!facility) return "";
    const facilities: Record<string, string> = {
      organization: "法人",
      mirai: "MIRAI",
      hikari: "HIKARI",
      studio_m: "studio M",
    };
    return facilities[facility] || facility;
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">監査ログ</h2>
        <p className="text-gray-600">すべての編集履歴を確認できます</p>
      </div>

      <div className="space-y-2">
        {logs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">監査ログはありません</p>
            </CardContent>
          </Card>
        ) : (
          logs.map((log) => (
            <Card key={log.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getEntityIcon(log.entityType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{log.userName || "Unknown"}</span>
                      <span className="text-gray-500">が</span>
                      <span className={`font-semibold ${getActionColor(log.action)}`}>
                        {getActionName(log.action)}
                      </span>
                      <span className="text-gray-500">しました</span>
                      <span className="text-sm text-gray-500">
                        ({getEntityTypeName(log.entityType)})
                      </span>
                      {log.facility && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {getFacilityName(log.facility)}
                        </span>
                      )}
                    </div>
                    {log.changes && (
                      <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <pre className="whitespace-pre-wrap font-mono text-xs">
                          {JSON.stringify(JSON.parse(log.changes), null, 2)}
                        </pre>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(log.createdAt).toLocaleString("ja-JP")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

