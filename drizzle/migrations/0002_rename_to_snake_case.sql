-- Rename all columns in student_responses to snake_case
ALTER TABLE student_responses 
RENAME COLUMN studentId TO student_id,
RENAME COLUMN tabNumber TO tab_number,
RENAME COLUMN responseData TO response_data,
RENAME COLUMN colorFeelings TO color_feelings,
RENAME COLUMN fontShapeAnswers TO font_shape_answers,
RENAME COLUMN gestaltAnswers TO gestalt_answers,
RENAME COLUMN canvaLink TO canva_link,
RENAME COLUMN vectorFileUrl TO vector_file_url,
RENAME COLUMN presentationFileUrl TO presentation_file_url,
RENAME COLUMN createdAt TO created_at,
RENAME COLUMN updatedAt TO updated_at;

-- Rename columns in approval_log to snake_case
ALTER TABLE approval_log 
RENAME COLUMN studentId TO student_id,
RENAME COLUMN tabNumber TO tab_number,
RENAME COLUMN isApproved TO is_approved,
RENAME COLUMN approvedBy TO approved_by,
RENAME COLUMN approvedAt TO approved_at,
RENAME COLUMN createdAt TO created_at,
RENAME COLUMN updatedAt TO updated_at;
