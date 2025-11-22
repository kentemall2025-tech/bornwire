"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface HorizontalListProps<T> {
  data: T[];
  renderItem: (item: T, index: number, className?: string) => React.ReactNode;
  itemSpacing?: string; // e.g. "space-x-4"
  className?: string;
}

export function VerticalList<T>({
  data,
  renderItem,
  itemSpacing = "space-x-4",
  className = "",
}: HorizontalListProps<T>) {
  return (
    <ScrollArea className={`w-full overflow-hidden ${className} `}>
      <div
        className={`flex w-max  ${itemSpacing} bg-yellow-500  shadow-lg gap-4`}
      >
        {data.map((item, index) => (
          <div className="bg-white shadow-xl m-4  rounded-lg flex ">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Optional Scrollbar */}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
