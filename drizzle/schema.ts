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

// Student Responses for each tab - using snake_case for database columns
export const studentResponses = mysqlTable("student_responses", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  groupName: varchar("group_name", { length: 255 }).default(""), // Store group name for admin dashboard
  tabNumber: int("tab_number").notNull(), // 1-7
  responseData: text("response_data").notNull().default("{}"), // JSON stringified
  colorFeelings: text("color_feelings").default("{}"), // JSON stringified
  fontShapeAnswers: text("font_shape_answers").default("{}"), // JSON stringified
  gestaltAnswers: text("gestalt_answers").default("{}"), // JSON stringified
  canvaLink: text("canva_link"), // Tab 5 Canva link
  vectorFileUrl: text("vector_file_url"), // Tab 6 vector file
  presentationFileUrl: text("presentation_file_url"), // Tab 7 presentation file
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type StudentResponse = typeof studentResponses.$inferSelect;
export type InsertStudentResponse = typeof studentResponses.$inferInsert;

// Teacher Approvals
export const approvalLog = mysqlTable("approval_log", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  tabNumber: int("tab_number").notNull(), // 1-7
  isApproved: boolean("is_approved").default(false).notNull(),
  approvedBy: varchar("approved_by", { length: 255 }), // Teacher name
  approvedAt: timestamp("approved_at"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export type ApprovalLog = typeof approvalLog.$inferSelect;
export type InsertApprovalLog = typeof approvalLog.$inferInsert;
