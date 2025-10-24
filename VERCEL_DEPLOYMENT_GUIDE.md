# Vercelデプロイメント完全ガイド

## 🚨 重要な前提条件

### 1. データベースマイグレーション（必須）

Vercelにデプロイする前に、TiDB Cloudで以下のSQLを実行してください:

```sql
ALTER TABLE jobPostings 
ADD COLUMN isActive INT NOT NULL DEFAULT 1 AFTER isPublished;
```

**実行手順:**
1. https://tidbcloud.com/ にログイン
2. クラスター「ji5exBiwxg8gdwBg4tmzdw」を選択
3. 「SQL Editor」または「Chat2Query」を開く
4. 上記のSQLを実行
5. `DESCRIBE jobPostings;` で確認

### 2. Vercel環境変数の設定

Vercelダッシュボードで以下の環境変数を設定してください:

#### DATABASE_URL
```
mysql://2ipNL7siLRixuQ5.2cb5763fa8de:eaQk1BZ6HjY48nR09kWJ@gateway02.us-east-1.prod.aws.tidbcloud.com:4000/ji5exBiwxg8gdwBg4tmzdw
```

**⚠️ 重要:** SSL パラメータ (`?ssl={"rejectUnauthorized":true}`) は含めないでください。Vercelのサーバーレス環境でJSONパースエラーが発生します。

#### JWT_SECRET (オプション)
```
your-secure-jwt-secret-here
```

設定しない場合はデフォルト値が使用されます。本番環境では必ず設定してください。

---

## 📋 デプロイメントチェックリスト

### Phase 1: コードの準備
- [x] TypeScript型エラーの修正
- [x] データベーススキーマの更新
- [x] Vercel設定ファイルの最適化
- [x] APIエンドポイントの統合

### Phase 2: データベース準備
- [ ] TiDB CloudでSQLマイグレーションを実行
- [ ] テーブル構造の確認

### Phase 3: Vercel設定
- [ ] DATABASE_URL環境変数の設定（SSL パラメータなし）
- [ ] JWT_SECRET環境変数の設定（推奨）
- [ ] 環境変数の保存

### Phase 4: デプロイメント
- [ ] GitHubへのプッシュ
- [ ] Vercelの自動デプロイ完了を待つ
- [ ] ビルドログでエラーがないことを確認

### Phase 5: 動作確認
- [ ] `/api/test-db` でデータベース接続テスト
- [ ] メインサイトの表示確認
- [ ] 管理者ログイン機能のテスト
- [ ] お知らせ管理機能のテスト
- [ ] 求人情報管理機能のテスト

---

## 🔧 修正内容の詳細

### 1. TypeScript型エラーの修正

**ファイル:** `server/db.ts`

```typescript
// Before
let _db: ReturnType<typeof drizzle> | null = null;

// After
import { MySql2Database } from "drizzle-orm/mysql2";
let _db: MySql2Database<Record<string, never>> | null = null;
```

**理由:** Drizzle ORMとmysql2の型互換性の問題を解決

### 2. データベーススキーマの更新

**ファイル:** `drizzle/schema.ts`

```typescript
export const jobPostings = mysqlTable("jobPostings", {
  // ... 既存のフィールド
  isPublished: int("isPublished").default(0),
  isActive: int("isActive").default(1).notNull(), // 追加
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  // ...
});
```

**理由:** APIで使用されている`isActive`カラムがスキーマに定義されていなかった

### 3. Vercel設定の最適化

**ファイル:** `vercel.json`

```json
{
  "functions": {
    "api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10,
      "includeFiles": "{server/**,drizzle/**,shared/**}"
    }
  }
}
```

**理由:** サーバーレス関数のメモリとタイムアウトを最適化し、必要なファイルを確実に含める

### 4. データベース接続の統一

**ファイル:** `api/test-db.ts`

```typescript
// Before
const connection = await mysql.createConnection(process.env.DATABASE_URL);

// After
const pool = mysql.createPool(process.env.DATABASE_URL);
```

**理由:** Poolベースの接続でDrizzle ORMとの互換性を向上

---

## 🧪 テスト手順

### 1. データベース接続テスト

```bash
curl https://mirainetwork-websaite.vercel.app/api/test-db
```

**期待される応答:**
```json
{
  "success": true,
  "message": "Database connection test passed",
  "announcements_count": 1
}
```

### 2. 認証APIテスト

```bash
curl https://mirainetwork-websaite.vercel.app/api/auth/test
```

### 3. 管理者ログイン

1. https://mirainetwork-websaite.vercel.app/admin/login にアクセス
2. 管理者アカウントでログイン
3. ダッシュボードが表示されることを確認

### 4. お知らせ管理

1. 管理者ダッシュボードから「お知らせ管理」にアクセス
2. 新規お知らせの作成をテスト
3. 既存お知らせの編集をテスト
4. お知らせの削除をテスト

---

## ❌ トラブルシューティング

### エラー: "This Serverless Function has crashed"

**原因:** 
- データベース接続エラー
- 環境変数の設定ミス
- TypeScript型エラー

**解決方法:**
1. Vercelダッシュボードで「Function Logs」を確認
2. DATABASE_URLにSSLパラメータが含まれていないか確認
3. 環境変数を再設定して再デプロイ

### エラー: "INTERNAL_SERVER_ERROR"

**原因:**
- データベーススキーマの不一致
- `isActive`カラムが存在しない

**解決方法:**
1. TiDB CloudでSQLマイグレーションを実行
2. `DESCRIBE jobPostings;` でカラムの存在を確認

### エラー: "Type 'MySql2Database<Record<string, unknown>>' is not assignable to type..."

**原因:**
- Drizzle ORMとmysql2の型定義の不一致

**解決方法:**
- 既に修正済み（`server/db.ts`で`MySql2Database<Record<string, never>>`を使用）

---

## 📞 サポート

問題が解決しない場合:
1. Vercelのデプロイメントログを確認
2. TiDB Cloudのデータベース接続を確認
3. 環境変数の設定を再確認

---

## ✅ デプロイメント成功の確認

すべてのテストが成功したら、以下を確認してください:

- [ ] メインサイトが正常に表示される
- [ ] データベース接続テストが成功する
- [ ] 管理者ログインが機能する
- [ ] お知らせの作成・編集・削除が機能する
- [ ] 求人情報の管理が機能する
- [ ] 画像アップロードが機能する

すべて確認できたら、デプロイメントは成功です！🎉

