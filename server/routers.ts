import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { students, studentResponses, approvalLog } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  pbl: router({
    createGroup: publicProcedure
      .input(z.object({ groupName: z.string(), members: z.array(z.string()) }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const result = await db.insert(students).values([
          { groupName: input.groupName, members: JSON.stringify(input.members) }
        ]);
        return { success: true };
      }),

    saveResponse: publicProcedure
      .input(z.object({
        studentId: z.number(),
        tabNumber: z.number(),
        responseData: z.record(z.string(), z.any()),
        colorFeelings: z.record(z.string(), z.string()).optional(),
        fontShapeAnswers: z.record(z.string(), z.string()).optional(),
        gestaltAnswers: z.record(z.string(), z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        
        try {
          // Check if record exists
          const existing = await db.select().from(studentResponses)
            .where(and(eq(studentResponses.studentId, input.studentId), eq(studentResponses.tabNumber, input.tabNumber)));
          
          if (existing && existing.length > 0) {
            // Update existing record
            await db.update(studentResponses).set({
              responseData: JSON.stringify(input.responseData),
              colorFeelings: input.colorFeelings ? JSON.stringify(input.colorFeelings) : null,
              fontShapeAnswers: input.fontShapeAnswers ? JSON.stringify(input.fontShapeAnswers) : null,
              gestaltAnswers: input.gestaltAnswers ? JSON.stringify(input.gestaltAnswers) : null,
            }).where(eq(studentResponses.id, existing[0].id));
          } else {
            // Insert new record
            await db.insert(studentResponses).values([
              {
                studentId: input.studentId,
                tabNumber: input.tabNumber,
                responseData: JSON.stringify(input.responseData),
                colorFeelings: input.colorFeelings ? JSON.stringify(input.colorFeelings) : null,
                fontShapeAnswers: input.fontShapeAnswers ? JSON.stringify(input.fontShapeAnswers) : null,
                gestaltAnswers: input.gestaltAnswers ? JSON.stringify(input.gestaltAnswers) : null,
              }
            ]);
          }
          return { success: true };
        } catch (error) {
          console.error('Error saving response:', error);
          throw new Error(`Failed to save response: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }),

    getApprovalStatus: publicProcedure
      .input(z.object({ studentId: z.number(), tabNumber: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { isApproved: false };
        const result = await db.select().from(approvalLog)
          .where(and(eq(approvalLog.studentId, input.studentId), eq(approvalLog.tabNumber, input.tabNumber)));
        return result.length > 0 ? result[0] : { isApproved: false };
      }),

    getAllStudents: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(students);
    }),

    getStudentResponses: publicProcedure
      .input(z.object({ studentId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        return await db.select().from(studentResponses).where(eq(studentResponses.studentId, input.studentId));
      }),

    updateApproval: publicProcedure
      .input(z.object({
        studentId: z.number(),
        tabNumber: z.number(),
        isApproved: z.boolean(),
        feedback: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        const existing = await db.select().from(approvalLog)
          .where(and(eq(approvalLog.studentId, input.studentId), eq(approvalLog.tabNumber, input.tabNumber)));
        if (existing.length > 0) {
          await db.update(approvalLog).set({
            isApproved: input.isApproved,
            feedback: input.feedback,
            approvedAt: input.isApproved ? new Date() : null,
          }).where(eq(approvalLog.id, existing[0].id));
        } else {
          await db.insert(approvalLog).values([
            {
              studentId: input.studentId,
              tabNumber: input.tabNumber,
              isApproved: input.isApproved,
              feedback: input.feedback,
              approvedAt: input.isApproved ? new Date() : null,
            }
          ]);
        }
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
