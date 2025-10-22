# 一般社団法人未来ネットワーク 公式ウェブサイト

一般社団法人未来ネットワークの公式ウェブサイトです。3つの福祉事業所（MIRAI、HIKARI、studio M）を紹介するコーポレートサイトで、お問い合わせフォーム、求人情報、管理画面を含みます。

## 技術スタック

### フロントエンド
- **React** 19.0.0 - UIライブラリ
- **TypeScript** 5.7.3 - 型安全な開発
- **Tailwind CSS** 3.4.17 - スタイリング
- **Wouter** 3.3.5 - ルーティング
- **tRPC Client** 11.0.0 - 型安全なAPI通信

### バックエンド
- **Express.js** 4.21.2 - Webフレームワーク
- **tRPC** 11.0.0 - 型安全なAPI
- **Drizzle ORM** 0.40.0 - データベースORM
- **MySQL** (TiDB Cloud) - データベース

## セットアップ手順

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成します：

```bash
cp .env.example .env
```

`.env`ファイルを編集して、データベース接続情報を設定します。

### 3. データベースのセットアップ

```bash
pnpm db:push
```

### 4. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで http://localhost:3001 にアクセスします。

## ビルドとデプロイ

### 本番ビルド

```bash
pnpm build
```

### 本番サーバーの起動

```bash
pnpm start
```

## ライセンス

MIT