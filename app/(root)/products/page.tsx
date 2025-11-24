"use client";
import { ChatIcon } from "@/components/ui/chaticon";
import { ProductsHorizontal } from "@/components/ui/horizontalProducts";
import InfiniteScrollDemo from "@/components/ui/infinity";
import SearchBar from "@/components/ui/searchbar";
import TitleTag from "@/components/ui/title";
import { VerticalProductList } from "@/components/ui/verticalproducts";

export default function page() {
  return (
    <section className="">
      <SearchBar />
      <div className=" p-4 flex flex-col gap-4  md:p-16">
        <TitleTag
          className="text-xl font-extrabold tracking-wider uppercase p-2"
          message="Samples"
        />

        <ProductsHorizontal />
      </div>
      <div className="font-extrabold  text-xl tracking-wider flex flex-col gap-4 mt-5 md:p-16 ">
        <TitleTag
          message="More Kente Fabrics"
          className="text-2xl font-bold uppercase p-2 my-5"
        />
        <VerticalProductList />
      </div>

      <ChatIcon />
    </section>
  );
}
