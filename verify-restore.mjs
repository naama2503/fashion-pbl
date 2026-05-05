import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  try {
    const { data: responses, error } = await supabase
      .from('student_responses')
      .select('*')
      .limit(20);
    
    if (error) {
      console.error('Error:', error);
      return;
    }
    
    console.log(`Total responses: ${responses?.length || 0}`);
    
    if (responses && responses.length > 0) {
      console.log('\nFirst few responses:');
      responses.slice(0, 5).forEach(r => {
        console.log(`  Student ${r.student_id}, Tab ${r.tab_number}, groupName: ${r.group_name || 'NULL'}`);
      });
      
      const uniqueStudents = new Set(responses.map(r => r.student_id));
      console.log(`\nUnique students: ${Array.from(uniqueStudents).join(', ')}`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

verify();
