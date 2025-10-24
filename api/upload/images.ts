import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  const origin = req.headers.origin || "https://mirainetwork-websaite.vercel.app";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Check if BLOB_READ_WRITE_TOKEN is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not set");
      return res.status(500).json({ 
        error: "画像アップロード機能が設定されていません。管理者に連絡してください。",
        details: "BLOB_READ_WRITE_TOKEN environment variable is missing"
      });
    }

    // Parse multipart form data
    const contentType = req.headers["content-type"] || "";
    if (!contentType.includes("multipart/form-data")) {
      return res.status(400).json({ error: "Content-Type must be multipart/form-data" });
    }

    // Get the boundary from content-type header
    const boundary = contentType.split("boundary=")[1];
    if (!boundary) {
      return res.status(400).json({ error: "No boundary found in Content-Type" });
    }

    // Read the body as buffer
    const chunks: Buffer[] = [];
    for await (const chunk of req as any) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);

    console.log(`Received ${body.length} bytes of data`);

    // Parse multipart data manually
    const parts = parseMultipartData(body, boundary);
    console.log(`Parsed ${parts.length} parts from multipart data`);

    if (parts.length === 0) {
      return res.status(400).json({ error: "No files found in request" });
    }

    const urls: string[] = [];

    // Upload each file to Vercel Blob
    for (const part of parts) {
      if (part.filename && part.data) {
        const timestamp = Date.now();
        const filename = `announcements/${timestamp}-${part.filename}`;
        
        console.log(`Uploading file: ${filename}, size: ${part.data.length} bytes`);

        const blob = await put(filename, part.data, {
          access: "public",
          contentType: part.contentType || "image/jpeg",
        });

        console.log(`Upload successful: ${blob.url}`);
        urls.push(blob.url);
      }
    }

    return res.json({ urls });
  } catch (error: any) {
    console.error("Error uploading images:", error);
    console.error("Error stack:", error.stack);
    console.error("Error message:", error.message);
    
    return res.status(500).json({ 
      error: "画像のアップロードに失敗しました",
      details: error.message || "Unknown error"
    });
  }
}

interface MultipartPart {
  filename?: string;
  contentType?: string;
  data?: Buffer;
}

function parseMultipartData(buffer: Buffer, boundary: string): MultipartPart[] {
  const parts: MultipartPart[] = [];
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const endBoundaryBuffer = Buffer.from(`--${boundary}--`);

  let start = 0;
  while (true) {
    // Find the next boundary
    const boundaryIndex = buffer.indexOf(boundaryBuffer, start);
    if (boundaryIndex === -1) break;

    // Find the end of this part
    const nextBoundaryIndex = buffer.indexOf(boundaryBuffer, boundaryIndex + boundaryBuffer.length);
    if (nextBoundaryIndex === -1) break;

    // Extract this part
    const partBuffer = buffer.slice(boundaryIndex + boundaryBuffer.length, nextBoundaryIndex);

    // Find the end of headers (double CRLF)
    const headerEndIndex = partBuffer.indexOf(Buffer.from("\r\n\r\n"));
    if (headerEndIndex === -1) {
      start = nextBoundaryIndex;
      continue;
    }

    // Parse headers
    const headersBuffer = partBuffer.slice(0, headerEndIndex);
    const headers = headersBuffer.toString("utf-8");

    // Extract filename and content-type
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    const contentTypeMatch = headers.match(/Content-Type:\s*([^\r\n]+)/i);

    if (filenameMatch) {
      const filename = filenameMatch[1];
      const contentType = contentTypeMatch ? contentTypeMatch[1].trim() : "application/octet-stream";
      const data = partBuffer.slice(headerEndIndex + 4, partBuffer.length - 2); // Remove trailing CRLF

      parts.push({
        filename,
        contentType,
        data,
      });
    }

    start = nextBoundaryIndex;
  }

  return parts;
}

