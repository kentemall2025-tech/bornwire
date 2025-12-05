import { supabase } from "@/lib/supabase/supabase";
import React from "react";
import MessageCard from "./messagecard";

export default async function page() {
  const { data: user } = await supabase.from("rooms").select("*");

  return (
    <div>
      <div>
        {user?.map((item, index) => {
          return <MessageCard key={index} {...item} />;
        })}
      </div>
    </div>
  );
}
