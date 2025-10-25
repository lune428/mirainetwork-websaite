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
    // Get published announcements with simple query
    const result = await sql`
      SELECT * FROM announcements
      WHERE "isPublished" = 'published'
      ORDER BY "createdAt" DESC
      LIMIT 10
    `;

    return res.status(200).json(result.rows);

  } catch (error: any) {
    console.error("Public Announcements API Error:", error);
    return res.status(500).json({
      error: 'Failed to fetch announcements',
      message: error.message,
      details: error.toString()
    });
  }
}

