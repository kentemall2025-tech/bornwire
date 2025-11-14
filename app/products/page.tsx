"use client";
import { ChatIcon } from "@/components/ui/chaticon";
import { ChatModal } from "@/components/ui/chatmodal";
import InfiniteScrollDemo from "@/components/ui/infinity";
import { HorizontalList } from "@/components/ui/scrollproducts";
import SearchBar from "@/components/ui/searchbar";
import TitleTag from "@/components/ui/title";
import { horizonproductsContent } from "@/lib/constants";
import Image from "next/image";
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
            <Image
              src={item.imageurl}
              alt={item.label}
              className="w-[300px] h-[260px]"
              width={1000}
              height={800}
            />
            <h3 className="font-semibold">{item.label}</h3>

            <span className="font-bold">${item.price}</span>
          </div>
        )}
      />
      <div>
        <TitleTag
          message="More Kente Fabrics"
          className="text-2xl font-bold uppercase p-2"
        />

        <InfiniteScrollDemo />
      </div>
      <ChatIcon />
    </section>
  );
}
