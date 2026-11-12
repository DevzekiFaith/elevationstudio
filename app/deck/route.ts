import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "docs",
    "elevation-studio-b2b-capabilities.pdf"
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Document not found", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="Elevation-Studio-B2B-Capabilities.pdf"',
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
    },
  });
}
