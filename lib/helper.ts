// import { supabase } from "./supabase";

// export async function createProduct(formData: FormData) {
//   const product = await supabase.from("product").insert({
//     formData,
//   });
// }

// export async function updateProduct(formData: FormData) {
//   const product = await supabase.from("product").update(FormData);
// }

// export async function deleteProduct(formData: FormData) {
//   const product = await supabase.from("product").update(FormData);
// }

// Perfect! Let’s build a Next.js 15.8 app that integrates Vercel Blob storage for file upload, listing, and management. I’ll give you a complete setup: backend API routes / server actions + frontend page.
// We’ll cover:

// Setting up Vercel Blob

// Environment variables

// Upload functionality

// Listing files

// Next.js 15.8 server/client usage

// 1️⃣ Setup Vercel Blob

// Go to Vercel Blob Dashboard

// Create a Blob storage instance

// Copy the API Key and Endpoint:

// VERCEL_BLOB_ENDPOINT=https://<your-project>.vercel-storage.com
// VERCEL_BLOB_TOKEN=<your-api-token>

// Add these to .env.local in your Next.js project.

// 2️⃣ Install the Vercel Blob SDK
// npm install @vercel/blob

/
// 6️⃣ Frontend Page
// app/blob/page.tsx:
//

// ✅ Notes

// The upload uses FormData → /api/upload → Vercel Blob

// The list fetches /api/list → Vercel Blob list() method

// Files are displayed as links with f.url

// Everything is server-safe; your token never reaches the client

// Optional Enhancements

// Add delete functionality with blob.delete(key)

// Use progress bars for uploads

// Add RLS or auth so users can only see their own files (if you integrate Supabase auth)

// I can also make a version with full Supabase auth integration, so each user sees only their uploaded files, directly linked to their auth.users ID.
// Do you want me to do that?
