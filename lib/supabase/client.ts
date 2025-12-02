// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

declare global {
  // allow storing on globalThis during HMR to keep single instance
  // eslint-disable-next-line no-var
  var __supabase_client__: ReturnType<typeof createBrowserClient> | undefined;
}

const globalAny: any = globalThis as any;

export const supabase =
  globalAny.__supabase_client__ ??
  (globalAny.__supabase_client__ = createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  ));
