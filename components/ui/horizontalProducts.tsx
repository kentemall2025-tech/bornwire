"use client";
import { horizonproductsContent } from "@/lib/constants";
import { HorizontalList } from "@/components/ui/scrollproducts";
import HorizontalProductCard from "./horzonproductcard";

export function ProductsHorizontal() {
  return (
    <HorizontalList
      data={horizonproductsContent}
      renderItem={(item, index) => (
        <HorizontalProductCard key={index} {...item} />
      )}
      itemSpacing="space-x-4"
      className="rounded-md border w-full"
    />
  );
}
