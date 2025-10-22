# デプロイ手順

## Vercel へのデプロイ（推奨）

### クイックスタート

1. **Vercelにログイン**: https://vercel.com/
2. **新しいプロジェクトをインポート**: 「Add New...」→「Project」を選択
3. **リポジトリを選択**: `lune428/mirainetwork-websaite`
4. **ビルド設定を確認**:
   - Build Command: `pnpm build`
   - Output Directory: `dist/public`
   - Install Command: `pnpm install`
5. **環境変数を設定**:
   ```
   DATABASE_URL=mysql://[your-database-url]
   NODE_ENV=production
   JWT_SECRET=[your-secret-key]
   ```
6. **デプロイをクリック**: 自動的にビルドとデプロイが開始されます
7. **URLにアクセス**: デプロイ完了後、自動生成されたURLにアクセス

### 詳細な手順

詳細なデプロイ手順については、プロジェクトルートの `vercel-deployment-guide.md` を参照してください。

## Railway へのデプロイ（代替）

Railwayでもデプロイ可能です。詳細は `railway-deployment-guide.md` を参照してください。

## 環境変数

以下の環境変数が必要です：

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `DATABASE_URL` | MySQLデータベースの接続URL | ✅ |
| `NODE_ENV` | 環境（production/development） | ✅ |
| `PORT` | サーバーポート（デフォルト: 3001） | ✅ |
| `JWT_SECRET` | JWT署名用のシークレットキー | 推奨 |
| `OWNER_ID` | 管理者ID（デフォルト: admin） | オプション |

## ビルドコマンド

```bash
pnpm install && pnpm build
```

## 起動コマンド

```bash
pnpm start
```

## 自動デプロイ

`main` ブランチへのプッシュで自動的に再デプロイされます。

## トラブルシューティング

### ビルドエラー

- ログを確認: Railway Dashboard → Deployments → View Logs
- 依存関係を確認: `package.json` と `pnpm-lock.yaml`

### データベース接続エラー

- `DATABASE_URL` が正しく設定されているか確認
- データベースサーバーが稼働しているか確認

### サイトが表示されない

- デプロイが成功しているか確認
- サーバーログを確認
- `PORT` 環境変数が正しく設定されているか確認

