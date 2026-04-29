ALTER TABLE `students` MODIFY COLUMN `groupName` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `openId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(255);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `loginMethod` varchar(50);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` varchar(50) DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `approval_log` ADD `student_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `approval_log` ADD `tab_number` int NOT NULL;--> statement-breakpoint
ALTER TABLE `approval_log` ADD `is_approved` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `approval_log` ADD `approved_by` varchar(255);--> statement-breakpoint
ALTER TABLE `approval_log` ADD `approved_at` timestamp;--> statement-breakpoint
ALTER TABLE `approval_log` ADD `feedback` text;--> statement-breakpoint
ALTER TABLE `approval_log` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `approval_log` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `student_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `tab_number` int NOT NULL;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `response_data` text NOT NULL;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `color_feelings` text;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `font_shape_answers` text;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `gestalt_answers` text;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `canva_link` text;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `vector_file_url` text;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `presentation_file_url` text;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `created_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `student_responses` ADD `updated_at` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `students` ADD `members` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `approval_log` DROP COLUMN `studentId`;--> statement-breakpoint
ALTER TABLE `approval_log` DROP COLUMN `groupId`;--> statement-breakpoint
ALTER TABLE `approval_log` DROP COLUMN `tabNumber`;--> statement-breakpoint
ALTER TABLE `approval_log` DROP COLUMN `approved`;--> statement-breakpoint
ALTER TABLE `approval_log` DROP COLUMN `approvedBy`;--> statement-breakpoint
ALTER TABLE `approval_log` DROP COLUMN `approvedAt`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `studentId`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `groupId`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab1_groupName`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab1_members`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab1_whyChosen`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab1_approved`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab2_q1_who`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab2_q2_why`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab2_q3_problem`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab2_q4_change`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab2_approved`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab3_colorChoices`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab3_colorExplanation`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab3_approved`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab4_logoDescription`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab4_logoReasoning`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab4_approved`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab5_itemType`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab5_itemDescription`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab5_howItHelps`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab5_approved`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab6_checklist`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab6_approved`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab7_reflection`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `tab7_approved`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `student_responses` DROP COLUMN `updatedAt`;--> statement-breakpoint
ALTER TABLE `students` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `students` DROP COLUMN `groupId`;