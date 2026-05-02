import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    console.log('Checking student_responses table...');
    
    const { data: responses, error: responsesError } = await supabase
      .from('student_responses')
      .select('*');
    
    if (responsesError) {
      console.error('Error fetching responses:', responsesError);
      return;
    }
    
    console.log(`Total responses in database: ${responses?.length || 0}`);
    
    if (responses && responses.length > 0) {
      console.log('\nStudent IDs in database:');
      const studentIds = new Set(responses.map(r => r.student_id));
      studentIds.forEach(id => {
        const count = responses.filter(r => r.student_id === id).length;
        console.log(`  - Student ${id}: ${count} responses`);
      });
    } else {
      console.log('No responses found in database');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDatabase();
