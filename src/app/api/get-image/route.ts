import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import mime from "mime-types";

export async function POST(req: Request) {
  const { pathFile } = await req.json();

  // Adjust the path to your image file

  const mimeType = mime.lookup(pathFile);
  const imageBuffer = fs.readFileSync(pathFile);
  const base64Image = imageBuffer.toString("base64");
  return NextResponse.json({ mimeType: mimeType, base64Image: base64Image });
}
