import mysql from 'mysql2/promise';

const conn = await mysql.createConnection({
  host: process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost',
  user: process.env.DATABASE_URL?.split('://')[1]?.split(':')[0] || 'root',
  password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] || '',
  database: process.env.DATABASE_URL?.split('/').pop() || 'test',
});

const [rows] = await conn.execute(
  'SELECT tab_number, response_data FROM student_responses WHERE student_id = ? AND tab_number = 2',
  [1]
);

console.log('Tab 2 data for Student 1:');
console.log(JSON.stringify(rows[0], null, 2));

await conn.end();
