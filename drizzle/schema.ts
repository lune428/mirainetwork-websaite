import { pgTable, varchar, text, integer, timestamp, serial } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  password: varchar("password", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 64 }).default("user"),
  facility: varchar("facility", { length: 64 }),
  lastSignedIn: timestamp("lastSignedIn"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Announcements table
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  facility: varchar("facility", { length: 64 }).notNull(),
  isPublished: varchar("isPublished", { length: 64 }).default("draft"),
  authorId: varchar("authorId", { length: 64 }).notNull(),
  images: text("images"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

// Job postings table
export const jobPostings = pgTable("jobPostings", {
  id: serial("id").primaryKey(),
  facility: varchar("facility", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  employmentType: varchar("employmentType", { length: 100 }).notNull(),
  jobDescription: text("jobDescription").notNull(),
  baseSalary: text("baseSalary").notNull(),
  workSchedule: text("workSchedule").notNull(),
  holidays: text("holidays").notNull(),
  socialInsurance: text("socialInsurance").notNull(),
  contractPeriod: text("contractPeriod").notNull(),
  isPublished: integer("isPublished").default(0),
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertJobPosting = typeof jobPostings.$inferInsert;

// Benefits table
export const benefits = pgTable("benefits", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 64 }).notNull(),
  displayOrder: integer("displayOrder").default(0).notNull(),
  isPublished: integer("isPublished").default(1).notNull(),
  createdBy: varchar("createdBy", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Benefit = typeof benefits.$inferSelect;
export type InsertBenefit = typeof benefits.$inferInsert;

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  facility: varchar("facility", { length: 64 }).default("corporate"),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 64 }).default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;
