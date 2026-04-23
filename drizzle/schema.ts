import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
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

/**
 * Students table for PBL project
 */
export const students = mysqlTable("students", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  groupId: varchar("groupId", { length: 64 }).notNull(),
  groupName: varchar("groupName", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = typeof students.$inferInsert;

/**
 * Student responses for each tab
 * Stores all 7 tab responses with approval status
 */
export const studentResponses = mysqlTable("student_responses", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  groupId: varchar("groupId", { length: 64 }).notNull(),
  
  // Tab 1: Group Decision
  tab1_groupName: text("tab1_groupName"),
  tab1_members: json("tab1_members"),
  tab1_whyChosen: text("tab1_whyChosen"),
  tab1_approved: boolean("tab1_approved").default(false),
  
  // Tab 2: Research
  tab2_q1_who: text("tab2_q1_who"),
  tab2_q2_why: text("tab2_q2_why"),
  tab2_q3_problem: text("tab2_q3_problem"),
  tab2_q4_change: text("tab2_q4_change"),
  tab2_approved: boolean("tab2_approved").default(false),
  
  // Tab 3: Design Rules
  tab3_colorChoices: json("tab3_colorChoices"),
  tab3_colorExplanation: text("tab3_colorExplanation"),
  tab3_approved: boolean("tab3_approved").default(false),
  
  // Tab 4: Logo Design
  tab4_logoDescription: text("tab4_logoDescription"),
  tab4_logoReasoning: text("tab4_logoReasoning"),
  tab4_approved: boolean("tab4_approved").default(false),
  
  // Tab 5: Fashion Item
  tab5_itemType: varchar("tab5_itemType", { length: 100 }),
  tab5_itemDescription: text("tab5_itemDescription"),
  tab5_howItHelps: text("tab5_howItHelps"),
  tab5_approved: boolean("tab5_approved").default(false),
  
  // Tab 6: Presentation Checklist
  tab6_checklist: json("tab6_checklist"),
  tab6_approved: boolean("tab6_approved").default(false),
  
  // Tab 7: Reflection
  tab7_reflection: text("tab7_reflection"),
  tab7_approved: boolean("tab7_approved").default(false),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudentResponse = typeof studentResponses.$inferSelect;
export type InsertStudentResponse = typeof studentResponses.$inferInsert;

/**
 * Teacher approvals log (for audit trail)
 */
export const approvalLog = mysqlTable("approval_log", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  groupId: varchar("groupId", { length: 64 }).notNull(),
  tabNumber: int("tabNumber").notNull(),
  approved: boolean("approved").notNull(),
  approvedBy: varchar("approvedBy", { length: 255 }),
  approvedAt: timestamp("approvedAt").defaultNow().notNull(),
});

export type ApprovalLog = typeof approvalLog.$inferSelect;
export type InsertApprovalLog = typeof approvalLog.$inferInsert;