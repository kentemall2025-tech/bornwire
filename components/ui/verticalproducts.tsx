import { horizonproductsContent } from "@/lib/constants";
import VerticalProductCard from "./veticalproductcard";
import { supabase } from "@/lib/supabase/supabase";

export async function VerticalProductList() {
  let { data: products, error } = await supabase.from("product").select("*");

  return (
    <div className="w-full p-4 max-w-full ">
      <div className="grid  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center ">
        {products?.map((item: any, index: number) => (
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
