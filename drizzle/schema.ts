import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// PBL Student Group
export const students = mysqlTable("students", {
  id: int("id").autoincrement().primaryKey(),
  groupName: varchar("groupName", { length: 255 }).notNull(),
  members: text("members").notNull(), // JSON stringified array of student names
  populationChosen: varchar("populationChosen", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

// Student Responses for each tab
export const studentResponses = mysqlTable("student_responses", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("student_id").notNull(),
  tabNumber: int("tab_number").notNull(), // 1-7
  responseData: text("response_data").notNull(), // JSON stringified
  colorFeelings: text("color_feelings"), // JSON stringified
  fontShapeAnswers: text("font_shape_answers"), // JSON stringified
  gestaltAnswers: text("gestalt_answers"), // JSON stringified
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
