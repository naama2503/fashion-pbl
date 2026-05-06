-- Add product_choice column for Tab 7
ALTER TABLE `student_responses` ADD COLUMN `product_choice` text;

-- Add reflection_data column for Tab 8
ALTER TABLE `student_responses` ADD COLUMN `reflection_data` text;
