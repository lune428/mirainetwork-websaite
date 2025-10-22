CREATE TABLE `auditLog` (
	`id` varchar(64) NOT NULL,
	`action` varchar(50) NOT NULL,
	`entityType` varchar(50) NOT NULL,
	`entityId` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`userName` varchar(255),
	`details` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`type` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`relatedId` varchar(64),
	`read` enum('true','false') NOT NULL DEFAULT 'false',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `announcements` MODIFY COLUMN `isPublished` enum('draft','pending','published','rejected') NOT NULL DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','mirai_admin','hikari_admin','studio_m_admin') NOT NULL DEFAULT 'user';

