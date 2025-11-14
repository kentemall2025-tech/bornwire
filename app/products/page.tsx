"use client";
import { HorizontalList } from "@/components/ui/scrollproducts";
import SearchBar from "@/components/ui/searchbar";
import TitleTag from "@/components/ui/title";
import { horizonproductsContent } from "@/lib/constants";
import React from "react";

export default function page() {
  return (
    <section>
      <SearchBar />
      <TitleTag
        className="text-2xl font-bold uppercase p-2"
        message="Samples"
      />
      <HorizontalList
        data={horizonproductsContent}
        renderItem={(item) => (
          <div key={item.id} className="p-4 max-h-auto ">
            {/* Render the product details (adjust this based on your actual data structure) */}
            <img
              src={item.imageurl}
              alt={item.label}
              className="w-[300xp] h-[260ppx]"
            />
            <h3 className="font-semibold">{item.label}</h3>

            <span className="font-bold">${item.price}</span>
          </div>
        )}
      />
      <TitleTag
        message="More Kente Fabrics"
        className="text-2xl font-bold uppercase p-2"
      />
    </section>
  );
}
