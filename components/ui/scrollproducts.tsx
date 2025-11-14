"use client";

import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface HorizontalListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemSpacing?: string; // e.g. "space-x-4"
  className?: string;
}

export function HorizontalList<T>({
  data,
  renderItem,
  itemSpacing = "space-x-4",
  className = "",
}: HorizontalListProps<T>) {
  return (
    <ScrollArea className={`w-full overflow-hidden ${className}`}>
      <div className={`flex w-max p-4 ${itemSpacing}`}>
        {data.map((item, index) => renderItem(item, index))}
      </div>

      {/* Optional Scrollbar */}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
