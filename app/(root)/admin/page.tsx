import { supabase } from "@/lib/supabase/supabase";
import React from "react";

export default async function page() {
  const { data } = await supabase.from("rooms").select("*");
  console.log(data);
  return <div></div>;
}
