import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { students, studentResponses, approvalLog } from "../drizzle/schema";
import { eq, and, sql } from "drizzle-orm";

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
          
          // Prepare all 10 values with exact types - using camelCase as that's what exists in DB
          const studentId = input.studentId;
          const tabNumber = input.tabNumber;
          const responseData = JSON.stringify(input.responseData || {});
          const colorFeelings = JSON.stringify(input.colorFeelings || {});
          const fontShapeAnswers = JSON.stringify(input.fontShapeAnswers || {});
          const gestaltAnswers = JSON.stringify(input.gestaltAnswers || {});
          const canvaLink = input.canvaLink || "";
          const vectorFileUrl = input.vectorFileUrl || "";
          const presentationFileUrl = input.presentationFileUrl || "";
          const now = new Date().toISOString();

          console.log(`[saveResponse] All 10 values prepared:`, {
            studentId, tabNumber, responseData, colorFeelings, fontShapeAnswers, 
            gestaltAnswers, canvaLink, vectorFileUrl, presentationFileUrl, updatedAt: now
          });

          // Try to find existing record
          let existing = null;
          try {
            const result = await db.select().from(studentResponses)
              .where(and(eq(studentResponses.studentId, studentId), eq(studentResponses.tabNumber, tabNumber)));
            existing = result && result.length > 0 ? result[0] : null;
            console.log(`[saveResponse] Found existing record: ${existing ? 'yes' : 'no'}`);
          } catch (queryError) {
            console.error("[saveResponse] Error querying existing record:", queryError);
          }

          if (existing) {
            // Update existing record with all 9 updateable fields
            try {
              console.log(`[saveResponse] Updating record ID ${existing.id}...`);
              await db.update(studentResponses)
                .set({
                  responseData,
                  colorFeelings,
                  fontShapeAnswers,
                  gestaltAnswers,
                  canvaLink,
                  vectorFileUrl,
                  presentationFileUrl,
                  updatedAt: new Date(),
                })
                .where(eq(studentResponses.id, existing.id));
              console.log(`[saveResponse] ✓ Successfully updated record ID ${existing.id}`);
            } catch (updateError) {
              console.error("[saveResponse] ✗ Error updating record:", updateError);
              const errorMsg = updateError instanceof Error ? updateError.message : 'Unknown error';
              throw new Error(`Failed to update response: ${errorMsg}`);
            }
          } else {
            // Insert new record with all 10 values using raw SQL for exact control
            // Using camelCase column names as that's what exists in the actual database
            try {
              console.log(`[saveResponse] Inserting new record with raw SQL (10 values)...`);
              
              // Use raw SQL to have exact control over parameters - using ACTUAL camelCase column names
              await db.execute(
                sql`INSERT INTO student_responses (
                  studentId, 
                  tabNumber, 
                  responseData, 
                  colorFeelings, 
                  fontShapeAnswers, 
                  gestaltAnswers, 
                  canvaLink, 
                  vectorFileUrl, 
                  presentationFileUrl, 
                  updatedAt
                ) VALUES (
                  ${studentId},
                  ${tabNumber},
                  ${responseData},
                  ${colorFeelings},
                  ${fontShapeAnswers},
                  ${gestaltAnswers},
                  ${canvaLink},
                  ${vectorFileUrl},
                  ${presentationFileUrl},
                  ${now}
                )`
              );
              console.log(`[saveResponse] ✓ Successfully inserted new record for student ${studentId}, tab ${tabNumber}`);
            } catch (insertError) {
              console.error("[saveResponse] ✗ Error inserting record:", insertError);
              const errorMsg = insertError instanceof Error ? insertError.message : 'Unknown error';
              console.error("[saveResponse] EXACT DATABASE ERROR:", errorMsg);
              throw new Error(`Failed to insert response: ${errorMsg}`);
            }
          }

          return { success: true };
        } catch (error) {
          console.error('[saveResponse] ✗ Final error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          throw new Error(`Failed to save response: ${errorMessage}`);
        }
      }),

    fetchResponse: publicProcedure
      .input(z.object({ studentId: z.number(), tabNumber: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          console.warn('[fetchResponse] Database not available');
          return null;
        }
        try {
          console.log(`[fetchResponse] Fetching response for student ${input.studentId}, tab ${input.tabNumber}`);
          const result = await db.select().from(studentResponses)
            .where(and(eq(studentResponses.studentId, input.studentId), eq(studentResponses.tabNumber, input.tabNumber)));
          
          if (result.length === 0) {
            console.log(`[fetchResponse] No response found for student ${input.studentId}, tab ${input.tabNumber}`);
            return null;
          }
          
          const response = result[0];
          console.log(`[fetchResponse] Found response:`, response);
          
          // Parse JSON fields if they're strings
          return {
            ...response,
            responseData: typeof response.responseData === 'string' ? JSON.parse(response.responseData) : response.responseData,
            colorFeelings: typeof response.colorFeelings === 'string' ? JSON.parse(response.colorFeelings) : response.colorFeelings,
            fontShapeAnswers: typeof response.fontShapeAnswers === 'string' ? JSON.parse(response.fontShapeAnswers) : response.fontShapeAnswers,
            gestaltAnswers: typeof response.gestaltAnswers === 'string' ? JSON.parse(response.gestaltAnswers) : response.gestaltAnswers,
          };
        } catch (error) {
          console.error('[fetchResponse] Error:', error);
          return null;
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
