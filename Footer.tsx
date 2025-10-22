import { Link } from "wouter";
import { Building2, Heart, Users, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 法人情報 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <div className="text-sm font-semibold">一般社団法人</div>
                <div className="text-sm font-semibold">未来ネットワーク</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              障害福祉サービスを通じて、利用者様の自立と社会参加を支援しています。
            </p>
            <div className="text-sm text-gray-400 space-y-1">
              <p>設立: 2016年7月1日</p>
              <p>法人番号: 9010105001875</p>
            </div>
          </div>

          {/* 運営事業所 */}
          <div>
            <h3 className="font-bold text-lg mb-4">運営事業所</h3>
            <div className="space-y-3">
              <Link href="/mirai">
                <a className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span>MIRAI</span>
                </a>
              </Link>
              <Link href="/hikari">
                <a className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <Heart className="w-4 h-4 text-green-400" />
                  <span>HIKARI</span>
                </a>
              </Link>
              <Link href="/studio-m">
                <a className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                  <Users className="w-4 h-4 text-yellow-400" />
                  <span>studio M</span>
                </a>
              </Link>
            </div>
          </div>

          {/* リンク */}
          <div>
            <h3 className="font-bold text-lg mb-4">リンク</h3>
            <div className="space-y-3">
              <Link href="/about">
                <a className="block text-sm text-gray-300 hover:text-white transition-colors">
                  未来ネットワークについて
                </a>
              </Link>
              <Link href="/mirai">
                <a className="block text-sm text-gray-300 hover:text-white transition-colors">
                  MIRAI
                </a>
              </Link>
              <Link href="/hikari">
                <a className="block text-sm text-gray-300 hover:text-white transition-colors">
                  HIKARI
                </a>
              </Link>
              <Link href="/studio-m">
                <a className="block text-sm text-gray-300 hover:text-white transition-colors">
                  studio M
                </a>
              </Link>
            </div>
          </div>

          {/* お問い合わせ情報 */}
          <div>
            <h3 className="font-bold text-lg mb-4">お問い合わせ</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>東京都八王子市小宮町1096-16</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:info@mirainetwork2017.com" className="hover:text-white transition-colors">
                  info@mirainetwork2017.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© 2016-2025 一般社団法人未来ネットワーク All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

