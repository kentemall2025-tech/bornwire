import * as React from "react";
import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import HorizontalProductsCard from "./horizontalProducts";
import { horizonproductsContent } from "@/lib/constants";

export function ScrollAreaHorizontal() {
  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4 ">
        {horizonproductsContent.map((item, index) => (
          <HorizontalProductsCard key={index} {...item} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
