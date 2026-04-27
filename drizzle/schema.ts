import { mysqlTable, int, varchar, text, timestamp, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  loginMethod: varchar("loginMethod", { length: 50 }),
  role: varchar("role", { length: 50 }).default("user"),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Student Groups
export const students = mysqlTable("students", {
  id: int("id").autoincrement().primaryKey(),
  groupName: varchar("groupName", { length: 255 }).notNull(),
  members: text("members").notNull(), // JSON stringified array
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

// Student Responses for each tab
export const studentResponses = mysqlTable("student_responses", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  tabNumber: int("tabNumber").notNull(), // 1-7
  responseData: text("responseData").notNull().default("{}"), // JSON stringified
  colorFeelings: text("colorFeelings").default("{}"), // JSON stringified
  fontShapeAnswers: text("fontShapeAnswers").default("{}"), // JSON stringified
  gestaltAnswers: text("gestaltAnswers").default("{}"), // JSON stringified
  canvaLink: text("canvaLink"), // Tab 5 Canva link
  vectorFileUrl: text("vectorFileUrl"), // Tab 6 vector file
  presentationFileUrl: text("presentationFileUrl"), // Tab 7 presentation file
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudentResponse = typeof studentResponses.$inferSelect;
export type InsertStudentResponse = typeof studentResponses.$inferInsert;

// Teacher Approvals
export const approvalLog = mysqlTable("approval_log", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  tabNumber: int("tabNumber").notNull(), // 1-7
  isApproved: boolean("isApproved").default(false).notNull(),
  approvedBy: varchar("approvedBy", { length: 255 }), // Teacher name
  approvedAt: timestamp("approvedAt"),
  feedback: text("feedback"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ApprovalLog = typeof approvalLog.$inferSelect;
export type InsertApprovalLog = typeof approvalLog.$inferInsert;
