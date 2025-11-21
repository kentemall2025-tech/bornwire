import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    // Check if the filename is provided
    if (!filename || filename.trim() === "") {
      return NextResponse.json(
        { error: "Filename is required and cannot be empty" },
        { status: 400 }
      );
    }
    if (request.body) {
      // Handle the file upload (assuming the body contains the file)
      const blob = await put(filename, request.body, { access: "public" });
      return NextResponse.json(blob);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
