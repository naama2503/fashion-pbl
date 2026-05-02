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
      console.log('\nResponses by student ID:');
      responses.forEach(r => {
        console.log(`  Student ${r.student_id}, Tab ${r.tab_number}: created ${r.created_at}`);
      });
    } else {
      console.log('❌ No responses found - all data was deleted');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

checkDatabase();
