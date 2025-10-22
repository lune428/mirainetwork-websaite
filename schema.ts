import { mysqlEnum, mysqlTable, text, timestamp, varchar, mediumtext } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  password: varchar("password", { length: 255 }), // Hashed password for email/password login
  role: mysqlEnum("role", ["user", "admin", "mirai_admin", "hikari_admin", "studio_m_admin"]).default("user").notNull(),
  facility: mysqlEnum("facility", ["organization", "mirai", "hikari", "studio_m"]),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Announcements table for news and updates
 * Each announcement can be associated with a specific facility or be organization-wide
 */
export const announcements = mysqlTable("announcements", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  facility: mysqlEnum("facility", ["organization", "mirai", "hikari", "studio_m"]).notNull(),
  authorId: varchar("authorId", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  publishedAt: timestamp("publishedAt"),
  isPublished: mysqlEnum("isPublished", ["draft", "pending", "published", "rejected"]).default("draft").notNull(),
  imageUrls: mediumtext("imageUrls"), // JSON array of image URLs (base64 or URLs)
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

/**
 * Gallery table for work and activity photos
 * Each facility can upload photos of their daily work and activities
 */
export const gallery = mysqlTable("gallery", {
  id: varchar("id", { length: 64 }).primaryKey(),
  facility: mysqlEnum("facility", ["mirai", "hikari", "studio_m"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: varchar("imageUrl", { length: 512 }).notNull(),
  category: mysqlEnum("category", ["work", "activity", "program", "event"]).notNull(),
  uploadedBy: varchar("uploadedBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = typeof gallery.$inferInsert;

/**
 * Page content table for editable facility page content
 * Allows managers to edit their facility page descriptions and programs
 */
export const pageContent = mysqlTable("pageContent", {
  id: varchar("id", { length: 64 }).primaryKey(),
  facility: mysqlEnum("facility", ["mirai", "hikari", "studio_m"]).notNull(),
  section: varchar("section", { length: 100 }).notNull(), // e.g., "description", "program", "work_content"
  content: text("content").notNull(),
  updatedBy: varchar("updatedBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PageContent = typeof pageContent.$inferSelect;
export type InsertPageContent = typeof pageContent.$inferInsert;


/**
 * Audit log table for tracking all content changes
 * Records who made what changes and when
 */
export const auditLog = mysqlTable("auditLog", {
  id: varchar("id", { length: 64 }).primaryKey(),
  action: varchar("action", { length: 50 }).notNull(), // e.g., "create", "update", "delete", "approve", "reject"
  entityType: varchar("entityType", { length: 50 }).notNull(), // e.g., "announcement", "gallery", "pageContent", "user"
  entityId: varchar("entityId", { length: 64 }).notNull(),
  userId: varchar("userId", { length: 64 }).notNull(),
  userName: varchar("userName", { length: 255 }),
  details: text("details"), // JSON string with additional details
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLog.$inferSelect;
export type InsertAuditLog = typeof auditLog.$inferInsert;

/**
 * Notifications table for user notifications
 * Used for approval requests, status updates, etc.
 */
export const notifications = mysqlTable("notifications", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // e.g., "approval_request", "approved", "rejected"
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  relatedId: varchar("relatedId", { length: 64 }), // ID of related entity (e.g., announcement ID)
  read: mysqlEnum("read", ["true", "false"]).default("false").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

