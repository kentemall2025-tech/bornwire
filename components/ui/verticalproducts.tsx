import { horizonproductsContent } from "@/lib/constants";
import { HorizontalList } from "@/components/ui/scrollproducts";
import VerticalProductCard from "./veticalproductcard";

export function VerticalProductList() {
  return (
    <div className="w-full p-4 max-w-full ">
      <div className="grid  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {horizonproductsContent.map((item, index) => (
          <VerticalProductCard
            key={index}
            imageurl={item.imageurl}
            label={item.label}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
