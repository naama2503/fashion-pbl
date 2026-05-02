import { getDb } from "./server/db.ts";
import { students, studentResponses } from "./drizzle/schema.ts";

try {
  const db = await getDb();
  if (!db) {
    console.log("Database not available");
    process.exit(1);
  }
  
  console.log("=== Students table ===");
  const studentsResult = await db.select().from(students);
  console.log(JSON.stringify(studentsResult, null, 2));
  
  console.log("\n=== Student Responses table ===");
  const responsesResult = await db.select().from(studentResponses);
  console.log(JSON.stringify(responsesResult, null, 2));
  
  console.log("\n=== Unique Student IDs ===");
  const uniqueIds = Array.from(new Set(responsesResult.map(r => r.studentId)));
  console.log(uniqueIds);
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}
