# Instagram API調査結果

## 重要な発見

### Instagram Basic Display APIの廃止

**2024年12月4日より、Instagram Basic Display APIは完全に廃止されました。**

公式発表: https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/

- 2024年9月4日に廃止が発表
- 2024年12月4日以降、すべてのリクエストがエラーを返す
- 個人アカウント向けのInstagram APIは今後提供されない

## 現在利用可能なInstagram API（2025年10月時点）

### 1. Instagram API with Instagram Login
- **対象**: Instagram Business または Creator アカウント
- **要件**: ビジネスアカウントまたはクリエイターアカウントが必要
- **機能**: メディアの取得・投稿、コメント管理、メンション検出など
- **Facebookページとの連携**: 不要

### 2. Instagram API with Facebook Login for Business
- **対象**: Instagram Business または Creator アカウント
- **要件**: FacebookページとリンクされたInstagramビジネス/クリエイターアカウント
- **機能**: メディアの取得・投稿、コメント管理、ハッシュタグ検索、インサイトなど
- **Facebookページとの連携**: 必要

### 3. Instagram Messaging API (via Messenger API)
- **対象**: Instagram Business または Creator アカウント
- **要件**: FacebookページとリンクされたInstagramアカウント
- **機能**: メッセージの送受信

## 未来ネットワークのウェブサイトでの実装方針

### 現状の課題
- Instagram Basic Display APIは廃止済み
- 新しいAPIはすべてビジネス/クリエイターアカウントが必要

### 推奨される代替方法

#### オプション1: Instagram API with Instagram Login（推奨）
**前提条件:**
- @studio.m2022 をビジネスアカウントまたはクリエイターアカウントに変換
- Meta開発者アカウントでアプリを作成
- Instagram API with Instagram Loginを設定

**メリット:**
- 公式API、無料
- 自動更新
- Facebookページ不要

**デメリット:**
- ビジネス/クリエイターアカウントへの変換が必要
- 初期設定が複雑

#### オプション2: Instagram oEmbed（最もシンプル）
**説明:**
- Instagram公式の埋め込み機能
- 個別投稿のURLを使用して埋め込み
- 公式ドキュメント: https://developers.facebook.com/docs/instagram/oembed

**メリット:**
- 設定不要、すぐに実装可能
- 公式サポート
- アカウントタイプ不問

**デメリット:**
- 投稿URLを手動で指定する必要がある
- 自動フィード更新は不可

#### オプション3: サードパーティサービス
**例:**
- EmbedSocial
- Curator
- SnapWidget
- Smash Balloon

**メリット:**
- 設定が簡単
- 自動更新

**デメリット:**
- 多くは有料（月額$10-50程度）
- 外部サービスへの依存

#### オプション4: Instagram埋め込みボタン
**説明:**
- Instagram公式の「Embed」機能を使用
- 各投稿ページから埋め込みコードを取得

**メリット:**
- 無料、公式
- 設定不要

**デメリット:**
- 手動で埋め込みコードを取得する必要がある
- 複数投稿の表示には複数の埋め込みが必要

## 次のステップ

クライアントに以下を確認:

1. @studio.m2022 のアカウントタイプ（個人/ビジネス/クリエイター）
2. MIRAI、HIKARIのInstagramアカウントの有無とタイプ
3. 希望する実装方法:
   - A) Instagram API with Instagram Login（ビジネスアカウント化が必要、自動更新）
   - B) Instagram oEmbed（シンプル、手動更新）
   - C) サードパーティサービス（有料、自動更新）
   - D) 手動埋め込み（無料、最もシンプル）

