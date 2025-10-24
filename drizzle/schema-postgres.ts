import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

/**
 * Announcements table
 * お知らせ記事を管理するテーブル
 */
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  facility: text("facility").notNull(), // "MIRAI", "HIKARI", "studio M", "法人本部"
  isPublished: boolean("is_published").default(false).notNull(),
  isApproved: boolean("is_approved").default(false).notNull(), // 承認フラグ
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  approvedAt: timestamp("approved_at"),
  approvedBy: text("approved_by"), // 承認者のID
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

