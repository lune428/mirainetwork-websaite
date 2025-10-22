CREATE TABLE `jobPostings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facility` enum('corporate','mirai','hikari','studio_m') NOT NULL,
	`title` varchar(255) NOT NULL,
	`employmentType` varchar(100) NOT NULL,
	`jobDescription` text NOT NULL,
	`baseSalary` text NOT NULL,
	`workSchedule` text NOT NULL,
	`holidays` text NOT NULL,
	`socialInsurance` text NOT NULL,
	`contractPeriod` text NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT false,
	`createdBy` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `jobPostings_id` PRIMARY KEY(`id`)
);
