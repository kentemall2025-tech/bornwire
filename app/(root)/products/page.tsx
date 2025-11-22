"use client";
import { ChatIcon } from "@/components/ui/chaticon";
import { ProductsHorizontal } from "@/components/ui/horizontalProducts";
import InfiniteScrollDemo from "@/components/ui/infinity";
import SearchBar from "@/components/ui/searchbar";
import TitleTag from "@/components/ui/title";
import { VerticalProductList } from "@/components/ui/verticalproducts";

export default function page() {
  return (
    <section>
      <SearchBar />
      <TitleTag
        className="text-2xl font-bold uppercase p-2"
        message="Samples"
      />

      <ProductsHorizontal />
      <div>
        <TitleTag
          message="More Kente Fabrics"
          className="text-2xl font-bold uppercase p-2"
        />

        <VerticalProductList />
      </div>

      <ChatIcon />
    </section>
  );
}
