import mysql from 'mysql2/promise';

async function checkAndFixDB() {
  const url = new URL(process.env.DATABASE_URL);
  
  const connection = await mysql.createConnection({
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: url.hostname.includes('rds') ? { rejectUnauthorized: false } : undefined
  });

  try {
    // Check existing columns
    const [columns] = await connection.execute('DESCRIBE student_responses');
    const columnNames = columns.map(c => c.Field);
    console.log('Existing columns:', columnNames);
    
    // Check if product_choice exists
    if (!columnNames.includes('product_choice')) {
      console.log('Adding product_choice column...');
      await connection.execute('ALTER TABLE `student_responses` ADD COLUMN `product_choice` text');
      console.log('✓ product_choice added');
    } else {
      console.log('✓ product_choice already exists');
    }
    
    // Check if reflection_data exists
    if (!columnNames.includes('reflection_data')) {
      console.log('Adding reflection_data column...');
      await connection.execute('ALTER TABLE `student_responses` ADD COLUMN `reflection_data` text');
      console.log('✓ reflection_data added');
    } else {
      console.log('✓ reflection_data already exists');
    }
    
    console.log('\nDatabase check complete!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await connection.end();
  }
}

checkAndFixDB();
