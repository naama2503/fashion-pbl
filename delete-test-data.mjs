import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function deleteTestData() {
  try {
    console.log('Deleting fake test data (IDs 30001, 60001)...');
    
    // Delete from student_responses table
    const { error: deleteError } = await supabase
      .from('student_responses')
      .delete()
      .in('student_id', [30001, 60001]);
    
    if (deleteError) {
      console.error('Error deleting from student_responses:', deleteError);
      return;
    }
    
    // Delete from students table
    const { error: deleteStudentsError } = await supabase
      .from('students')
      .delete()
      .in('id', [30001, 60001]);
    
    if (deleteStudentsError) {
      console.error('Error deleting from students:', deleteStudentsError);
      return;
    }
    
    console.log('✅ Successfully deleted fake test data');
    console.log('Real students (1, 2) remain in the database');
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteTestData();
