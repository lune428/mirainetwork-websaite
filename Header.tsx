import { APP_TITLE } from "@/const";
import { Link } from "wouter";
import NotificationPanel from "./NotificationPanel";
import { useUser } from "@/hooks/use-user";

interface HeaderProps {
  currentPage?: "home" | "about" | "mirai" | "hikari" | "studio-m" | "admin" | "recruit";
}

export default function Header({ currentPage = "home" }: HeaderProps) {
  const isActive = (page: string) => currentPage === page;
  const { user } = useUser();

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center p-1">
              <img src="/mirai-logo.webp" alt="未来ネットワーク" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{APP_TITLE}</h1>
              <p className="text-xs text-muted-foreground">障害福祉サービス</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {user && <NotificationPanel />}
            <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                isActive("home") ? "text-primary" : "hover:text-primary"
              }`}
            >
              ホーム
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors ${
                isActive("about") ? "text-primary" : "hover:text-primary"
              }`}
            >
              未来ネットワークについて
            </Link>
            <Link 
              href="/mirai" 
              className={`text-sm font-medium transition-colors ${
                isActive("mirai") ? "text-primary" : "hover:text-primary"
              }`}
            >
              MIRAI
            </Link>
            <Link 
              href="/hikari" 
              className={`text-sm font-medium transition-colors ${
                isActive("hikari") ? "text-primary" : "hover:text-primary"
              }`}
            >
              HIKARI
            </Link>
            <Link 
              href="/studio-m" 
              className={`text-sm font-medium transition-colors ${
                isActive("studio-m") ? "text-primary" : "hover:text-primary"
              }`}
            >
              studio M
            </Link>
            <Link 
              href="/recruit" 
              className={`text-sm font-medium transition-colors ${
                isActive("recruit") ? "text-primary" : "hover:text-primary"
              }`}
            >
              求人・採用
            </Link>
          </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

