import { createConnection } from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Parse DATABASE_URL
const url = new URL(DATABASE_URL);
const config = {
  host: url.hostname,
  port: url.port || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: {
    rejectUnauthorized: false,
  },
};

console.log(`Connecting to database: ${config.database} at ${config.host}:${config.port}`);

async function runMigration() {
  let connection;
  try {
    connection = await createConnection(config);
    console.log('✓ Connected to database');

    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'drizzle/0002_crazy_loners.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    // Split by statement breakpoints and execute each statement
    const statements = migrationSQL
      .split('--> statement-breakpoint')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`\nExecuting ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        console.log(`[${i + 1}/${statements.length}] Executing: ${stmt.substring(0, 80)}...`);
        await connection.execute(stmt);
        console.log(`  ✓ Success`);
      } catch (error) {
        // Some errors are expected (e.g., column already exists)
        if (error.code === 'ER_DUP_FIELDNAME' || error.code === 'ER_CANT_DROP_FIELD_OR_KEY') {
          console.log(`  ⚠ Skipped (${error.code}): ${error.message}`);
        } else {
          console.error(`  ✗ Error: ${error.message}`);
          throw error;
        }
      }
    }

    console.log('\n✓ Migration completed successfully!');
  } catch (error) {
    console.error('✗ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

runMigration();
