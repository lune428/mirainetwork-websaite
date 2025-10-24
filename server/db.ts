import { sql } from "@vercel/postgres";

/**
 * Simple database helper using Vercel Postgres
 * No ORM, just raw SQL queries
 */

export { sql };

/**
 * Get all announcements
 */
export async function getAnnouncements() {
  const result = await sql`
    SELECT * FROM announcements 
    ORDER BY created_at DESC
  `;
  return result.rows;
}

/**
 * Get announcement by ID
 */
export async function getAnnouncementById(id: number) {
  const result = await sql`
    SELECT * FROM announcements 
    WHERE id = ${id}
  `;
  return result.rows[0];
}

/**
 * Create announcement
 */
export async function createAnnouncement(data: {
  title: string;
  content: string;
  facility: string;
  imageUrl?: string;
}) {
  const result = await sql`
    INSERT INTO announcements (title, content, facility, image_url, is_published, is_approved)
    VALUES (${data.title}, ${data.content}, ${data.facility}, ${data.imageUrl || null}, false, false)
    RETURNING *
  `;
  return result.rows[0];
}

/**
 * Update announcement
 */
export async function updateAnnouncement(id: number, data: {
  title?: string;
  content?: string;
  facility?: string;
  imageUrl?: string;
  isPublished?: boolean;
  isApproved?: boolean;
}) {
  const updates: string[] = [];
  const values: any[] = [];
  
  if (data.title !== undefined) {
    updates.push(`title = $${updates.length + 1}`);
    values.push(data.title);
  }
  if (data.content !== undefined) {
    updates.push(`content = $${updates.length + 1}`);
    values.push(data.content);
  }
  if (data.facility !== undefined) {
    updates.push(`facility = $${updates.length + 1}`);
    values.push(data.facility);
  }
  if (data.imageUrl !== undefined) {
    updates.push(`image_url = $${updates.length + 1}`);
    values.push(data.imageUrl);
  }
  if (data.isPublished !== undefined) {
    updates.push(`is_published = $${updates.length + 1}`);
    values.push(data.isPublished);
  }
  if (data.isApproved !== undefined) {
    updates.push(`is_approved = $${updates.length + 1}`);
    values.push(data.isApproved);
  }
  
  updates.push(`updated_at = NOW()`);
  
  // Note: This function uses raw SQL and is not currently used
  // If needed, should be migrated to Drizzle ORM
  throw new Error("updateAnnouncement is deprecated. Use Drizzle ORM in api/admin.ts instead.");
}

/**
 * Delete announcement
 */
export async function deleteAnnouncement(id: number) {
  await sql`DELETE FROM announcements WHERE id = ${id}`;
}

