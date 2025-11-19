"use client";
import { createClient } from "@supabase/supabase-js";

// load the env variables for supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// exporting your supabase

export const supabase = createClient(supabaseUrl, supabaseAnnonKey);
