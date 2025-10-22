# Instagram API 実装計画

## 概要

Instagram API with Instagram Loginを使用して、@studio.m2022 のInstagram投稿を自動的にウェブサイトに表示する機能を実装します。

## 技術仕様

### 使用API
- **Instagram API with Instagram Login**
- **Host URL**: `graph.instagram.com`
- **API Version**: `v24.0`（最新版）

### 必要な権限（Scopes）
- `instagram_business_basic` - 基本情報とメディアの取得

### 取得可能なメディアフィールド

| フィールド | 説明 | 用途 |
|----------|------|------|
| `id` | メディアID | 一意識別子 |
| `media_type` | メディアタイプ | IMAGE, VIDEO, CAROUSEL_ALBUM |
| `media_url` | メディアURL | 画像・動画のURL |
| `thumbnail_url` | サムネイルURL | 動画のサムネイル |
| `permalink` | Instagram投稿URL | 投稿へのリンク |
| `caption` | キャプション | 投稿テキスト |
| `timestamp` | 投稿日時 | 日付表示 |
| `username` | ユーザー名 | @studio.m2022 |

## 実装アーキテクチャ

### バックエンド（Node.js + Express）

#### 1. 環境変数の設定

```env
INSTAGRAM_APP_ID=<アプリID>
INSTAGRAM_APP_SECRET=<アプリシークレット>
INSTAGRAM_ACCESS_TOKEN=<アクセストークン>
INSTAGRAM_USER_ID=<InstagramユーザーID>
```

#### 2. Instagram APIルーター

**ファイル**: `server/instagram.ts`

```typescript
import { Router } from 'express';
import axios from 'axios';

const router = Router();

// Instagram投稿を取得するエンドポイント
router.get('/api/instagram/media', async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;
    
    // Instagram Graph APIを呼び出し
    const response = await axios.get(
      `https://graph.instagram.com/v24.0/${userId}/media`,
      {
        params: {
          fields: 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,username',
          access_token: accessToken,
          limit: 12 // 最新12件を取得
        }
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Instagram API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Instagram media' });
  }
});

// アクセストークンをリフレッシュするエンドポイント
router.post('/api/instagram/refresh-token', async (req, res) => {
  try {
    const response = await axios.get(
      'https://graph.instagram.com/refresh_access_token',
      {
        params: {
          grant_type: 'ig_refresh_token',
          access_token: process.env.INSTAGRAM_ACCESS_TOKEN
        }
      }
    );
    
    // 新しいトークンを環境変数に保存（本番環境ではDBに保存）
    console.log('New access token:', response.data.access_token);
    
    res.json(response.data);
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

export default router;
```

#### 3. サーバーへの統合

**ファイル**: `server/index.ts`

```typescript
import instagramRouter from './instagram';

// 既存のルーターの後に追加
app.use(instagramRouter);
```

### フロントエンド（React）

#### 1. Instagram投稿表示コンポーネント

**ファイル**: `client/src/components/InstagramFeed.tsx`（更新）

```typescript
import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';

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

export default function InstagramFeed({ username, title, limit = 9 }: InstagramFeedProps) {
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
      <div className="w-full py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      )}
      
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-lg">
        {/* ヘッダー */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Instagram className="w-12 h-12 text-pink-600" />
            <div>
              <p className="text-lg font-semibold text-gray-900">@{username}</p>
              <p className="text-sm text-gray-600">最新の投稿</p>
            </div>
          </div>

          <a
            href={`https://www.instagram.com/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Instagram className="w-5 h-5" />
            Instagramをフォロー
          </a>
        </div>

        {/* 投稿グリッド */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url}
                alt={item.caption || 'Instagram post'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* オーバーレイ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {item.caption && (
                    <p className="text-white text-sm line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>

              {/* 動画アイコン */}
              {item.media_type === 'VIDEO' && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              )}

              {/* カルーセルアイコン */}
              {item.media_type === 'CAROUSEL_ALBUM' && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* フッター */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            日々の活動の様子や作品、イベント情報などをInstagramで発信しています。
            <br />
            ぜひフォローして最新情報をチェックしてください！
          </p>
        </div>
      </div>
    </div>
  );
}
```

## セキュリティ対策

### 1. 環境変数の保護
- `.env` ファイルをGitに含めない（`.gitignore`に追加）
- 本番環境では環境変数を安全に管理

### 2. アクセストークンの管理
- トークンをデータベースに暗号化して保存
- 定期的な自動リフレッシュ（60日ごと）

### 3. レート制限
- Instagram APIのレート制限を考慮
- キャッシング機能の実装（15-30分間隔で更新）

## キャッシング戦略

```typescript
// キャッシュの実装例
let cachedMedia: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15分

router.get('/api/instagram/media', async (req, res) => {
  const now = Date.now();
  
  // キャッシュが有効な場合は返す
  if (cachedMedia && (now - lastFetchTime) < CACHE_DURATION) {
    return res.json(cachedMedia);
  }
  
  // APIから新しいデータを取得
  try {
    const response = await axios.get(/* ... */);
    cachedMedia = response.data;
    lastFetchTime = now;
    res.json(cachedMedia);
  } catch (error) {
    // エラー時はキャッシュを返す（あれば）
    if (cachedMedia) {
      return res.json(cachedMedia);
    }
    res.status(500).json({ error: 'Failed to fetch Instagram media' });
  }
});
```

## デプロイメント手順

1. **環境変数の設定**
   - 本番環境に環境変数を設定

2. **依存パッケージのインストール**
   ```bash
   pnpm add axios
   ```

3. **ビルドとデプロイ**
   ```bash
   pnpm build
   pnpm start
   ```

## トークンリフレッシュの自動化

長期的なトークン（60日有効）を使用し、定期的に自動リフレッシュするcronジョブを設定:

```typescript
// トークンリフレッシュのcronジョブ（例：毎月1日に実行）
import cron from 'node-cron';

cron.schedule('0 0 1 * *', async () => {
  console.log('Refreshing Instagram access token...');
  try {
    const response = await axios.get(
      'https://graph.instagram.com/refresh_access_token',
      {
        params: {
          grant_type: 'ig_refresh_token',
          access_token: process.env.INSTAGRAM_ACCESS_TOKEN
        }
      }
    );
    
    // 新しいトークンを保存
    // 本番環境ではデータベースに保存
    console.log('Token refreshed successfully');
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }
});
```

## テスト手順

1. **ローカル環境でのテスト**
   - 環境変数を設定
   - `pnpm dev` で開発サーバー起動
   - `http://localhost:5000/studio-m` でInstagramフィードを確認

2. **API動作確認**
   - `curl http://localhost:5000/api/instagram/media` でAPIレスポンスを確認

3. **エラーハンドリングのテスト**
   - 無効なトークンでのテスト
   - ネットワークエラーのシミュレーション

## 今後の拡張

- MIRAI、HIKARIのInstagramアカウント追加
- 投稿の詳細モーダル表示
- いいね数、コメント数の表示（追加の権限が必要）
- 投稿の自動更新（WebSocket使用）

