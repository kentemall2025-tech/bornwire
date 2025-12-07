"use client";
import { supabase } from "@/lib/supabase/supabase";
import Image from "next/image";
import React from "react";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = await params;
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("label", id)
    .maybeSingle();
  console.log(product);

  return (
    <div>
      <div>
        <div>
          <Image src={""} alt={""} width={500} height={500} />
        </div>
      </div>
    </div>
  );
}
