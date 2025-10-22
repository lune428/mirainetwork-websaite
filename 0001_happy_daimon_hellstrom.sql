CREATE TABLE `announcements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`facility` enum('corporate','mirai','hikari','studio_m') NOT NULL,
	`isPublished` enum('draft','pending','published','rejected') NOT NULL DEFAULT 'draft',
	`images` text,
	`authorId` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`publishedAt` timestamp,
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `announcements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auditLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(64) NOT NULL,
	`userName` varchar(255),
	`action` varchar(100) NOT NULL,
	`entityType` varchar(100) NOT NULL,
	`entityId` varchar(100),
	`details` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `auditLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `galleryImages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facility` enum('mirai','hikari','studio_m') NOT NULL,
	`category` enum('work','activity','program','event') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`imageUrl` text NOT NULL,
	`uploadedBy` varchar(64) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `galleryImages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` enum('info','success','warning','error') NOT NULL DEFAULT 'info',
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pageContents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`facility` enum('corporate','mirai','hikari','studio_m') NOT NULL,
	`section` varchar(100) NOT NULL,
	`content` text NOT NULL,
	`updatedBy` varchar(64) NOT NULL,
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `pageContents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','mirai_admin','hikari_admin','studio_m_admin') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `facility` enum('corporate','mirai','hikari','studio_m');