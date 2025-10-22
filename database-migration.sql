-- データベース移行SQL
-- お知らせ管理機能のためのスキーマ更新

-- usersテーブルにfacilityとpasswordカラムを追加
ALTER TABLE users 
ADD COLUMN facility ENUM('corporate', 'mirai', 'hikari', 'studio_m') AFTER role,
ADD COLUMN password VARCHAR(255) AFTER email;

-- announcementsテーブルに新しいカラムを追加
ALTER TABLE announcements
ADD COLUMN facility ENUM('corporate', 'mirai', 'hikari', 'studio_m') DEFAULT 'corporate' AFTER content,
ADD COLUMN is_published ENUM('draft', 'pending', 'published', 'rejected') DEFAULT 'draft' AFTER facility,
ADD COLUMN author_id VARCHAR(255) AFTER is_published,
ADD COLUMN images TEXT AFTER author_id;

-- publishedAtカラムのデフォルト値を削除（NULLを許可）
ALTER TABLE announcements
MODIFY COLUMN published_at TIMESTAMP NULL;

-- 既存のデータに対するデフォルト値の設定
UPDATE announcements SET facility = 'corporate' WHERE facility IS NULL;
UPDATE announcements SET is_published = 'published' WHERE is_published IS NULL;

-- job_postingsテーブルが存在しない場合は作成
CREATE TABLE IF NOT EXISTS job_postings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  location VARCHAR(255),
  employment_type VARCHAR(100),
  salary VARCHAR(255),
  is_active INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- benefitsテーブルが存在しない場合は作成
CREATE TABLE IF NOT EXISTS benefits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- contact_messagesテーブルが存在しない場合は作成
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  facility VARCHAR(100),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

