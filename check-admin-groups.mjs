import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'dev.db');

try {
  const db = new Database(dbPath);
  
  // Query student_responses to see group names
  const responses = db.prepare(`
    SELECT DISTINCT student_id, group_name, COUNT(*) as response_count
    FROM student_responses
    GROUP BY student_id, group_name
    ORDER BY student_id
  `).all();
  
  console.log('\n📊 Student Groups in Database:');
  console.log('================================');
  responses.forEach(row => {
    console.log(`Student ID: ${row.student_id} | Group: "${row.group_name}" | Responses: ${row.response_count}`);
  });
  
  db.close();
} catch (error) {
  console.error('Error:', error.message);
}
