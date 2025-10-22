import { Router } from 'express';
import axios from 'axios';

const router = Router();

// モックデータ（開発・テスト用）
const MOCK_INSTAGRAM_DATA = {
  data: [
    {
      id: '1',
      media_type: 'IMAGE',
      media_url: '/images/studio-m-interior.webp',
      permalink: 'https://www.instagram.com/p/example1/',
      caption: '本日の作業風景です。みなさん集中して取り組んでいます！ #studioM #創作活動',
      timestamp: '2025-10-15T10:30:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '2',
      media_type: 'IMAGE',
      media_url: '/images/studio-m-reception.webp',
      permalink: 'https://www.instagram.com/p/example2/',
      caption: '新しい作品が完成しました✨ #handmade #アート',
      timestamp: '2025-10-14T14:20:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '3',
      media_type: 'IMAGE',
      media_url: '/images/IMG_8214.jpg',
      permalink: 'https://www.instagram.com/p/example3/',
      caption: '今日のランチタイム🍱 みんなで楽しく食事しました',
      timestamp: '2025-10-13T12:00:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '4',
      media_type: 'IMAGE',
      media_url: '/images/43E0D0DB-7F7E-49B3-894A-7A71079BAA7C_1_201_a.jpeg',
      permalink: 'https://www.instagram.com/p/example4/',
      caption: '施設の様子です。明るく清潔な環境で活動しています☀️',
      timestamp: '2025-10-12T09:15:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '5',
      media_type: 'IMAGE',
      media_url: '/images/8BC1ADE2-B56F-406C-B4DE-1F67C29CD64B_1_201_a.jpeg',
      permalink: 'https://www.instagram.com/p/example5/',
      caption: 'イベントの準備中です🎨 #イベント準備',
      timestamp: '2025-10-11T16:45:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '6',
      media_type: 'IMAGE',
      media_url: '/images/IMG_8234_edited.jpg',
      permalink: 'https://www.instagram.com/p/example6/',
      caption: '素敵な作品ができました！ #創作 #アート作品',
      timestamp: '2025-10-10T11:30:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '7',
      media_type: 'IMAGE',
      media_url: '/images/studio-m-main.webp',
      permalink: 'https://www.instagram.com/p/example7/',
      caption: 'studio Mの外観です🏢',
      timestamp: '2025-10-09T13:20:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '8',
      media_type: 'IMAGE',
      media_url: '/images/IMG_7936.jpeg',
      permalink: 'https://www.instagram.com/p/example8/',
      caption: '今日も一日頑張りました💪 #日々の活動',
      timestamp: '2025-10-08T17:00:00+0000',
      username: 'studio.m2022'
    },
    {
      id: '9',
      media_type: 'IMAGE',
      media_url: '/images/A7ED78D5-25EA-4996-822F-E934FAEDC8FB_1_201_a.jpeg',
      permalink: 'https://www.instagram.com/p/example9/',
      caption: '新しいプロジェクトスタート！ #新企画',
      timestamp: '2025-10-07T10:00:00+0000',
      username: 'studio.m2022'
    }
  ]
};

// キャッシュ管理
let cachedMedia: any = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15分

/**
 * Instagram投稿を取得するエンドポイント
 * 環境変数が設定されている場合は実際のAPIを呼び出し、
 * 設定されていない場合はモックデータを返す
 */
router.get('/api/instagram/media', async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;
    const useMockData = !accessToken || !userId;

    // モックデータを使用する場合
    if (useMockData) {
      console.log('Using mock Instagram data (API credentials not configured)');
      return res.json(MOCK_INSTAGRAM_DATA);
    }

    // キャッシュチェック
    const now = Date.now();
    if (cachedMedia && (now - lastFetchTime) < CACHE_DURATION) {
      console.log('Returning cached Instagram data');
      return res.json(cachedMedia);
    }

    // Instagram Graph APIを呼び出し
    console.log('Fetching Instagram data from API...');
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

    // キャッシュを更新
    cachedMedia = response.data;
    lastFetchTime = now;

    res.json(cachedMedia);
  } catch (error: any) {
    console.error('Instagram API Error:', error.response?.data || error.message);
    
    // エラー時はキャッシュを返す（あれば）
    if (cachedMedia) {
      console.log('API error, returning cached data');
      return res.json(cachedMedia);
    }

    // キャッシュもない場合はモックデータを返す
    console.log('API error and no cache, returning mock data');
    res.json(MOCK_INSTAGRAM_DATA);
  }
});

/**
 * アクセストークンをリフレッシュするエンドポイント
 * 長期トークン（60日有効）を更新する
 */
router.post('/api/instagram/refresh-token', async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(400).json({ 
        error: 'Access token not configured',
        message: 'Please set INSTAGRAM_ACCESS_TOKEN in environment variables'
      });
    }

    const response = await axios.get(
      'https://graph.instagram.com/refresh_access_token',
      {
        params: {
          grant_type: 'ig_refresh_token',
          access_token: accessToken
        }
      }
    );

    console.log('Access token refreshed successfully');
    console.log('New token expires in:', response.data.expires_in, 'seconds');
    console.log('Please update INSTAGRAM_ACCESS_TOKEN with:', response.data.access_token);

    res.json({
      success: true,
      access_token: response.data.access_token,
      token_type: response.data.token_type,
      expires_in: response.data.expires_in
    });
  } catch (error: any) {
    console.error('Token refresh error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to refresh token',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Instagram API設定状態を確認するエンドポイント
 */
router.get('/api/instagram/status', (req, res) => {
  const hasAccessToken = !!process.env.INSTAGRAM_ACCESS_TOKEN;
  const hasUserId = !!process.env.INSTAGRAM_USER_ID;
  const isConfigured = hasAccessToken && hasUserId;

  res.json({
    configured: isConfigured,
    usingMockData: !isConfigured,
    hasAccessToken,
    hasUserId,
    cacheStatus: cachedMedia ? 'active' : 'empty',
    lastFetchTime: lastFetchTime > 0 ? new Date(lastFetchTime).toISOString() : null
  });
});

export default router;

