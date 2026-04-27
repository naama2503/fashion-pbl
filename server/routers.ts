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
        canvaLink: z.string().optional(),
        vectorFileUrl: z.string().optional(),
        presentationFileUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          console.warn("[saveResponse] Database not available");
          return { success: false, error: "Database not available" };
        }

        try {
          console.log(`[saveResponse] Saving response for student ${input.studentId}, tab ${input.tabNumber}`);
          
          // Prepare the data to save
          const dataToSave = {
            responseData: JSON.stringify(input.responseData),
            colorFeelings: input.colorFeelings ? JSON.stringify(input.colorFeelings) : null,
            fontShapeAnswers: input.fontShapeAnswers ? JSON.stringify(input.fontShapeAnswers) : null,
            gestaltAnswers: input.gestaltAnswers ? JSON.stringify(input.gestaltAnswers) : null,
            canvaLink: input.canvaLink || null,
            vectorFileUrl: input.vectorFileUrl || null,
            presentationFileUrl: input.presentationFileUrl || null,
          };

          // Try to find existing record
          let existing = null;
          try {
            const result = await db.select().from(studentResponses)
              .where(and(eq(studentResponses.studentId, input.studentId), eq(studentResponses.tabNumber, input.tabNumber)));
            existing = result && result.length > 0 ? result[0] : null;
          } catch (queryError) {
            console.error("[saveResponse] Error querying existing record:", queryError);
            // Continue anyway - we'll try to insert
          }

          if (existing) {
            // Update existing record
            try {
              await db.update(studentResponses).set(dataToSave).where(eq(studentResponses.id, existing.id));
              console.log(`[saveResponse] Updated record ID ${existing.id}`);
            } catch (updateError) {
              console.error("[saveResponse] Error updating record:", updateError);
              throw new Error(`Failed to update response: ${updateError instanceof Error ? updateError.message : 'Unknown error'}`);
            }
          } else {
            // Insert new record
            try {
              await db.insert(studentResponses).values([
                {
                  studentId: input.studentId,
                  tabNumber: input.tabNumber,
                  ...dataToSave,
                }
              ]);
              console.log(`[saveResponse] Inserted new record for student ${input.studentId}, tab ${input.tabNumber}`);
            } catch (insertError) {
              console.error("[saveResponse] Error inserting record:", insertError);
              throw new Error(`Failed to insert response: ${insertError instanceof Error ? insertError.message : 'Unknown error'}`);
            }
          }

          return { success: true };
        } catch (error) {
          console.error('[saveResponse] Error saving response:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          throw new Error(`Failed to save response: ${errorMessage}`);
        }
      }),

    getApprovalStatus: publicProcedure
      .input(z.object({ studentId: z.number(), tabNumber: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { isApproved: false };
        try {
          const result = await db.select().from(approvalLog)
            .where(and(eq(approvalLog.studentId, input.studentId), eq(approvalLog.tabNumber, input.tabNumber)));
          return result.length > 0 ? result[0] : { isApproved: false };
        } catch (error) {
          console.error('[getApprovalStatus] Error:', error);
          return { isApproved: false };
        }
      }),

    getAllStudents: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      try {
        return await db.select().from(students);
      } catch (error) {
        console.error('[getAllStudents] Error:', error);
        return [];
      }
    }),

    getStudentResponses: publicProcedure
      .input(z.object({ studentId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        try {
          return await db.select().from(studentResponses).where(eq(studentResponses.studentId, input.studentId));
        } catch (error) {
          console.error('[getStudentResponses] Error:', error);
          return [];
        }
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
        try {
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
        } catch (error) {
          console.error('[updateApproval] Error:', error);
          throw new Error(`Failed to update approval: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
