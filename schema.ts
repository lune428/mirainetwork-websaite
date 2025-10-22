import { mysqlEnum, mysqlTable, text, timestamp, varchar, int, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  password: varchar("password", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "mirai_admin", "hikari_admin", "studio_m_admin"]).default("user").notNull(),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Announcements table for news and updates
 */
export const announcements = mysqlTable("announcements", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]).notNull(),
  isPublished: mysqlEnum("isPublished", ["draft", "pending", "published", "rejected"]).default("draft").notNull(),
  images: text("images"), // JSON array of image URLs
  authorId: varchar("authorId", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  publishedAt: timestamp("publishedAt"),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

/**
 * Gallery images for each facility
 */
export const galleryImages = mysqlTable("galleryImages", {
  id: int("id").primaryKey().autoincrement(),
  facility: mysqlEnum("facility", ["mirai", "hikari", "studio_m"]).notNull(),
  category: mysqlEnum("category", ["work", "activity", "program", "event"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  uploadedBy: varchar("uploadedBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;

/**
 * Page content for each facility
 */
export const pageContents = mysqlTable("pageContents", {
  id: int("id").primaryKey().autoincrement(),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]).notNull(),
  section: varchar("section", { length: 100 }).notNull(), // e.g., "about", "programs", "activities"
  content: text("content").notNull(),
  updatedBy: varchar("updatedBy", { length: 64 }).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type PageContent = typeof pageContents.$inferSelect;
export type InsertPageContent = typeof pageContents.$inferInsert;

/**
 * Audit log for tracking all changes
 */
export const auditLog = mysqlTable("auditLog", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("userId", { length: 64 }).notNull(),
  userName: varchar("userName", { length: 255 }),
  action: varchar("action", { length: 100 }).notNull(), // e.g., "create", "update", "delete", "approve", "reject"
  entityType: varchar("entityType", { length: 100 }).notNull(), // e.g., "announcement", "gallery", "page"
  entityId: varchar("entityId", { length: 100 }),
  details: text("details"), // JSON with change details
  createdAt: timestamp("createdAt").defaultNow(),
});

export type AuditLog = typeof auditLog.$inferSelect;
export type InsertAuditLog = typeof auditLog.$inferInsert;

/**
 * Notifications for users
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").primaryKey().autoincrement(),
  userId: varchar("userId", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: mysqlEnum("type", ["info", "success", "warning", "error"]).default("info").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;


/**
 * Job postings table for recruitment information
 */
export const jobPostings = mysqlTable("jobPostings", {
  id: int("id").primaryKey().autoincrement(),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  employmentType: varchar("employmentType", { length: 100 }).notNull(), // 正社員・パート等
  jobDescription: text("jobDescription").notNull(), // 仕事の内容
  baseSalary: text("baseSalary").notNull(), // 基本給
  workSchedule: text("workSchedule").notNull(), // 勤務形態
  holidays: text("holidays").notNull(), // 休日・休暇
  socialInsurance: text("socialInsurance").notNull(), // 社会保険
  contractPeriod: text("contractPeriod").notNull(), // 契約期間
  isPublished: boolean("isPublished").default(false).notNull(),
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertJobPosting = typeof jobPostings.$inferInsert;

/**
 * Benefits table for welfare and treatment information
 */
export const benefits = mysqlTable("benefits", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["welfare", "insurance", "allowance", "facility", "other"]).notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Benefit = typeof benefits.$inferSelect;
export type InsertBenefit = typeof benefits.$inferInsert;

