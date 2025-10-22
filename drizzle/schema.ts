import { mysqlTable, varchar, text, timestamp, int, mysqlEnum } from "drizzle-orm/mysql-core";

// Users table
export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  password: varchar("password", { length: 255 }), // Hashed password
  loginMethod: varchar("login_method", { length: 50 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user"),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]),
  lastSignedIn: timestamp("last_signed_in"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Announcements table
export const announcements = mysqlTable("announcements", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  facility: mysqlEnum("facility", ["corporate", "mirai", "hikari", "studio_m"]).default("corporate"),
  isPublished: mysqlEnum("is_published", ["draft", "pending", "published", "rejected"]).default("draft"),
  authorId: varchar("author_id", { length: 255 }),
  images: text("images"), // JSON array of image URLs
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

// Job postings table
export const jobPostings = mysqlTable("job_postings", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  location: varchar("location", { length: 255 }),
  employmentType: varchar("employment_type", { length: 100 }),
  salary: varchar("salary", { length: 255 }),
  isActive: int("is_active").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertJobPosting = typeof jobPostings.$inferInsert;

// Benefits table
export const benefits = mysqlTable("benefits", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Benefit = typeof benefits.$inferSelect;
export type InsertBenefit = typeof benefits.$inferInsert;

// Contact messages table
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  facility: varchar("facility", { length: 100 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = typeof contactMessages.$inferInsert;

