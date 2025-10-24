-- Add isActive column to jobPostings table
ALTER TABLE jobPostings 
ADD COLUMN isActive INT NOT NULL DEFAULT 1 AFTER isPublished;
