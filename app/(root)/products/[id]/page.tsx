"use client";
import { supabase } from "@/lib/supabase/supabase";
import React from "react";

export default async function Page() {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert({
        full_name: "Marcus Oware",
        avatar: "",
      })
      .single();

    if (error) {
      console.error("Error inserting user:", error.message);
      return (
        <div>
          <h2>Error inserting user: {error.message}</h2>
        </div>
      );
    }

    console.log("Inserted user:", data);

    return (
      <div>
        <h2>User inserted successfully!</h2>
        <p>{JSON.stringify(data)}</p>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div></div>;
  }
}
