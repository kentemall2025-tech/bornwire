import { ScrollAreaHorizontal } from "@/components/ui/scrollproducts";
import SearchBar from "@/components/ui/searchbar";
import TitleTag from "@/components/ui/title";
import React from "react";

export default function page() {
  return (
    <section>
      <SearchBar />
      <TitleTag
        className="text-2xl font-bold uppercase p-2"
        message="Samples"
      />
      <ScrollAreaHorizontal />

      <TitleTag
        message="More Kente Fabrics"
        className="text-2xl font-bold uppercase p-2"
      />
    </section>
  );
}
