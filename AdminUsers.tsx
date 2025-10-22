import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Users } from "lucide-react";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  facility: string | null;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    facility: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";
      const method = editingUser ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save user");
      }

      toast.success(editingUser ? "ユーザーを更新しました" : "ユーザーを作成しました");

      setDialogOpen(false);
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "", role: "user", facility: "" });
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role,
      facility: user.facility || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("このユーザーを削除してもよろしいですか？")) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete user");
      }

      toast.success("ユーザーを削除しました");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getRoleName = (role: string) => {
    const roles: Record<string, string> = {
      admin: "法人管理者",
      mirai_admin: "MIRAI管理者",
      hikari_admin: "HIKARI管理者",
      studio_m_admin: "studio M管理者",
      user: "一般ユーザー",
    };
    return roles[role] || role;
  };

  const getFacilityName = (facility: string | null) => {
    if (!facility) return "-";
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">ユーザー管理</h2>
          <p className="text-gray-600">事業所管理者アカウントの作成・編集</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingUser(null);
              setFormData({ name: "", email: "", password: "", role: "user", facility: "" });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              新規ユーザー作成
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "ユーザー編集" : "新規ユーザー作成"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  placeholder={editingUser ? "変更する場合のみ入力" : ""}
                />
                {editingUser && (
                  <p className="text-xs text-gray-500 mt-1">空欄の場合はパスワードを変更しません</p>
                )}
              </div>
              <div>
                <Label htmlFor="role">権限</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">法人管理者</SelectItem>
                    <SelectItem value="mirai_admin">MIRAI管理者</SelectItem>
                    <SelectItem value="hikari_admin">HIKARI管理者</SelectItem>
                    <SelectItem value="studio_m_admin">studio M管理者</SelectItem>
                    <SelectItem value="user">一般ユーザー</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="facility">所属事業所</Label>
                <Select
                  value={formData.facility}
                  onValueChange={(value) => setFormData({ ...formData, facility: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organization">法人</SelectItem>
                    <SelectItem value="mirai">MIRAI</SelectItem>
                    <SelectItem value="hikari">HIKARI</SelectItem>
                    <SelectItem value="studio_m">studio M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {editingUser ? "更新" : "作成"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{user.name || "名前なし"}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {getRoleName(user.role)}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {getFacilityName(user.facility)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(user)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

