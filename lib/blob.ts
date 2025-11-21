import { Blob } from "@vercel/blob";

export const blob = new Blob({
  token: process.env.VERCEL_BLOB_TOKEN! as string,
  endpoint: process.env.VERCEL_BLOB_ENDPOINT! as string,
});
