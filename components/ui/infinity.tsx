"use client";
import React from "react";
import InfiniteScroll from "./infinite-scroll";
import { Loader2 } from "lucide-react";
import { horizonproductsContent } from "@/lib/constants";

const Product = (props: productprops) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-gray-200 p-2">
      <div className="flex gap-2">
        <div className="flex flex-col justify-center gap-1">
          <div className="font-bold text-primary">
            {props.id} - {props.label}
          </div>
          <div className="text-sm text-muted-foreground">{props.price}</div>
        </div>
      </div>
    </div>
  );
};

const InfiniteScrollDemo = () => {
  const [products, setProducts] = React.useState(horizonproductsContent);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  return (
    <div className="max-h-[300px] w-full  overflow-y-auto px-10">
      <div className="flex w-full flex-col items-center  gap-3">
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteScrollDemo;
