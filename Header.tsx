import { APP_TITLE } from "@/const";
import { Link } from "wouter";

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage = "home" }: HeaderProps) {
  const isActive = (page: string) => currentPage === page;

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <a className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center p-1">
                <img src="/mirai-logo-new.png" alt="未来ネットワーク" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">{APP_TITLE}</h1>
                <p className="text-xs text-muted-foreground">障害福祉サービス</p>
              </div>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className={`text-sm font-medium transition-colors ${isActive("home") ? "text-primary" : "hover:text-primary"}`}>
                ホーム
              </a>
            </Link>
            <Link href="/about">
              <a className={`text-sm font-medium transition-colors ${isActive("about") ? "text-primary" : "hover:text-primary"}`}>
                未来ネットワークについて
              </a>
            </Link>
            <Link href="/mirai">
              <a className={`text-sm font-medium transition-colors ${isActive("mirai") ? "text-primary" : "hover:text-primary"}`}>
                MIRAI
              </a>
            </Link>
            <Link href="/hikari">
              <a className={`text-sm font-medium transition-colors ${isActive("hikari") ? "text-primary" : "hover:text-primary"}`}>
                HIKARI
              </a>
            </Link>
            <Link href="/studio-m">
              <a className={`text-sm font-medium transition-colors ${isActive("studio-m") ? "text-primary" : "hover:text-primary"}`}>
                studio M
              </a>
            </Link>
            <Link href="/recruit">
              <a className={`text-sm font-medium transition-colors ${isActive("recruit") ? "text-primary" : "hover:text-primary"}`}>
                求人・採用
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
