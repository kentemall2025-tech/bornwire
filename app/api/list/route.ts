import { blob } from "@/lib/blob";

export async function GET() {
  try {
    const items = await blob.list();
    return new Response(JSON.stringify(items), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
