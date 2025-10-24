import { mysqlTable, mysqlEnum, varchar, text, int, timestamp } from "drizzle-orm/mysql-core";

// Users table
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  password: varchar("password", { length: 255 }), // Hashed password
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "mirai_admin", "hikari_admin", "studio_m_admin"]).default("user"),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]),
  lastSignedIn: timestamp("lastSignedIn"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Announcements table
export const announcements = mysqlTable("announcements", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]).notNull(),
  isPublished: mysqlEnum("isPublished", ["draft", "pending", "published", "rejected"]).default("draft"),
  authorId: varchar("authorId", { length: 64 }).notNull(),
  images: text("images"), // JSON array of image URLs
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

// Job postings table
export const jobPostings = mysqlTable("jobPostings", {
  id: int("id").primaryKey().autoincrement(),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  employmentType: varchar("employmentType", { length: 100 }).notNull(),
  jobDescription: text("jobDescription").notNull(),
  baseSalary: text("baseSalary").notNull(),
  workSchedule: text("workSchedule").notNull(),
  holidays: text("holidays").notNull(),
  socialInsurance: text("socialInsurance").notNull(),
  contractPeriod: text("contractPeriod").notNull(),
  isPublished: int("isPublished").default(0),
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertJobPosting = typeof jobPostings.$inferInsert;

// Benefits table
export const benefits = mysqlTable("benefits", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["welfare", "insurance", "allowance", "facility", "other"]).notNull(),
  displayOrder: int("displayOrder").default(0).notNull(),
  isPublished: int("isPublished").default(1).notNull(),
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Benefit = typeof benefits.$inferSelect;
export type InsertBenefit = typeof benefits.$inferInsert;

// Contact submissions table
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]).default("corporate"),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

