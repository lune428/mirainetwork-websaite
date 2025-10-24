# データベースマイグレーション手順

## 概要
`jobPostings`テーブルに`isActive`カラムを追加する必要があります。

## TiDB Cloudでの実行手順

1. TiDB Cloudのダッシュボードにログイン
   - https://tidbcloud.com/

2. クラスター「ji5exBiwxg8gdwBg4tmzdw」を選択

3. 「SQL Editor」または「Chat2Query」を開く

4. 以下のSQLを実行:

```sql
ALTER TABLE jobPostings 
ADD COLUMN isActive INT NOT NULL DEFAULT 1 AFTER isPublished;
```

5. 実行結果を確認:

```sql
DESCRIBE jobPostings;
```

## 確認事項

カラムが正しく追加されたことを確認してください:
- カラム名: `isActive`
- データ型: `INT`
- NULL許可: `NOT NULL`
- デフォルト値: `1`
- 位置: `isPublished`の後

## 注意事項

- このマイグレーションは既存のデータに影響を与えません
- すべての既存レコードの`isActive`は自動的に`1`に設定されます
- このカラムは求人情報の有効/無効を管理するために使用されます

