CREATE TABLE `approval_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`groupId` varchar(64) NOT NULL,
	`tabNumber` int NOT NULL,
	`approved` boolean NOT NULL,
	`approvedBy` varchar(255),
	`approvedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `approval_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `student_responses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`groupId` varchar(64) NOT NULL,
	`tab1_groupName` text,
	`tab1_members` json,
	`tab1_whyChosen` text,
	`tab1_approved` boolean DEFAULT false,
	`tab2_q1_who` text,
	`tab2_q2_why` text,
	`tab2_q3_problem` text,
	`tab2_q4_change` text,
	`tab2_approved` boolean DEFAULT false,
	`tab3_colorChoices` json,
	`tab3_colorExplanation` text,
	`tab3_approved` boolean DEFAULT false,
	`tab4_logoDescription` text,
	`tab4_logoReasoning` text,
	`tab4_approved` boolean DEFAULT false,
	`tab5_itemType` varchar(100),
	`tab5_itemDescription` text,
	`tab5_howItHelps` text,
	`tab5_approved` boolean DEFAULT false,
	`tab6_checklist` json,
	`tab6_approved` boolean DEFAULT false,
	`tab7_reflection` text,
	`tab7_approved` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `student_responses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`groupId` varchar(64) NOT NULL,
	`groupName` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `students_id` PRIMARY KEY(`id`)
);
