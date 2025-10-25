import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "@vercel/postgres";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log("=== Public Announcements API ===");
    console.log("Fetching published announcements...");

    // Get published announcements
    const result = await sql`
      SELECT 
        id,
        title,
        content,
        facility,
        images,
        "publishedAt",
        "createdAt"
      FROM announcements
      WHERE "isPublished" = 'published'
      ORDER BY "publishedAt" DESC, "createdAt" DESC
      LIMIT 10
    `;

    console.log(\`Found \${result.rows.length} published announcements\`);

    // Parse images JSON string to array
    const announcements = result.rows.map(row => {
      let images = [];
      if (row.images) {
        try {
          images = typeof row.images === 'string' ? JSON.parse(row.images) : row.images;
        } catch (e) {
          console.error('Failed to parse images:', row.images, e);
          images = [];
        }
      }
      return {
        ...row,
        images
      };
    });

    return res.status(200).json(announcements);

  } catch (error: any) {
    console.error("=== Public Announcements API Error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    return res.status(500).json({
      error: 'Failed to fetch announcements',
      message: error.message
    });
  }
}
