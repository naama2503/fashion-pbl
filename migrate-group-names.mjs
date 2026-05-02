import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'dev.db');

try {
  const db = new Database(dbPath);
  
  // First, check existing data
  const existingResponses = db.prepare(`
    SELECT student_id, COUNT(*) as count FROM student_responses GROUP BY student_id
  `).all();
  
  console.log('\n📊 Existing student responses:');
  existingResponses.forEach(row => {
    console.log(`  Student ID ${row.student_id}: ${row.count} responses`);
  });
  
  // Update group names for existing data
  const stmt = db.prepare(`
    UPDATE student_responses 
    SET group_name = CASE 
      WHEN student_id = 1 THEN 'Student 1'
      WHEN student_id = 2 THEN 'Student 2'
      WHEN student_id = 30001 THEN 'Test Group 1'
      WHEN student_id = 60001 THEN 'Test Group 2'
      ELSE 'Student ' || student_id
    END
    WHERE group_name = '' OR group_name IS NULL
  `);
  
  const result = stmt.run();
  console.log(`\n✅ Updated ${result.changes} rows with group names`);
  
  // Verify the update
  const updated = db.prepare(`
    SELECT DISTINCT student_id, group_name FROM student_responses ORDER BY student_id
  `).all();
  
  console.log('\n📊 Updated groups:');
  updated.forEach(row => {
    console.log(`  Student ID ${row.student_id}: "${row.group_name}"`);
  });
  
  db.close();
} catch (error) {
  console.error('Error:', error.message);
}
