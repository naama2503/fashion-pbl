import fs from 'fs';

const routersPath = './server/routers.ts';
let content = fs.readFileSync(routersPath, 'utf-8');

// Replace the getAllStudents query
const oldQuery = `      try {
        // Get unique student IDs from student_responses table
        // Gracefully handle if groupName column doesn't exist yet
        let responses: any[] = [];
        try {
          responses = await db.select().from(studentResponses);
        } catch (selectError: any) {
          // If groupName column doesn't exist, return empty list
          console.warn('[getAllStudents] groupName column not available yet');
          return [];
        }`;

const newQuery = `      try {
        // Get unique student IDs from student_responses table
        // Works with or without groupName column
        let responses: any[] = [];
        try {
          responses = await db.select().from(studentResponses);
        } catch (selectError: any) {
          console.warn('[getAllStudents] Error fetching responses:', selectError);
          return [];
        }
        
        // If no responses, return empty list
        if (!responses || responses.length === 0) {
          return [];
        }`;

content = content.replace(oldQuery, newQuery);

fs.writeFileSync(routersPath, content);
console.log('✅ Updated getAllStudents query');
