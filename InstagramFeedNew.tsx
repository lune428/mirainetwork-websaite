import { useEffect, useState } from 'react';
import { Instagram, Loader2 } from 'lucide-react';

interface InstagramMedia {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  username: string;
}

interface InstagramFeedProps {
  username: string;
  title?: string;
  limit?: number;
}

export default function InstagramFeedNew({ username, title, limit = 9 }: InstagramFeedProps) {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramMedia = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/instagram/media');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram media');
        }
        
        const data = await response.json();
        setMedia(data.data.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Error fetching Instagram media:', err);
        setError('Instagram投稿の読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramMedia();
  }, [limit]);

  if (loading) {
    return (
      <div className="w-full py-16">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-12 shadow-lg">
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <p className="text-gray-600 font-medium">Instagram投稿を読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16">
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-12 shadow-lg">
          <div className="text-center">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <p className="text-sm text-gray-600">
              しばらくしてから再度お試しください
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
        </div>
      )}
      
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-6 md:p-10 shadow-xl">
        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Instagram className="w-9 h-9 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">@{username}</p>
              <p className="text-sm text-gray-600">最新の投稿をチェック</p>
            </div>
          </div>

          <a
            href={`https://www.instagram.com/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold rounded-full hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform"
          >
            <Instagram className="w-5 h-5" />
            Instagramをフォロー
          </a>
        </div>

        {/* 投稿グリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
          {media.map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* 画像 */}
              <img
                src={item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url}
                alt={item.caption || 'Instagram post'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* グラデーションオーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {item.caption && (
                    <p className="text-white text-xs md:text-sm line-clamp-3 leading-relaxed">
                      {item.caption}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-medium">Instagramで見る</span>
                  </div>
                </div>
              </div>

              {/* メディアタイプアイコン */}
              {item.media_type === 'VIDEO' && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              )}

              {item.media_type === 'CAROUSEL_ALBUM' && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full p-2 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              )}

              {/* ホバー時の枠線エフェクト */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
            </a>
          ))}
        </div>

        {/* フッター */}
        <div className="text-center pt-6 border-t border-purple-200">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            日々の活動の様子や作品、イベント情報などをInstagramで発信しています。
            <br className="hidden md:block" />
            ぜひフォローして最新情報をチェックしてください！
          </p>
        </div>
      </div>
    </div>
  );
}

