"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import VerticalProductCard from "@/components/ui/veticalproductcard";
import { supabase } from "@/lib/supabase/supabase";

export default function ResultsPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("product").select("*");

      if (error) {
        console.error(error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const normalize = (str: string) =>
    str.toLowerCase().replace(/[-_]/g, " ").trim();

  const q = normalize(query);

  // Only return products that start with the query string
  const filtered = products.filter((p: any) => {
    const label = normalize(p.label);

    // Matches if the label starts with the query string
    return label.startsWith(q);
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Results for: <span className="text-yellow-500">{query}</span>
      </h2>
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 lg:max-w-[90%] lg:mx-auto gap-4">
          {filtered.map((product: any) => (
            <VerticalProductCard
              id={product.id}
              key={product.id}
              label={product.label}
              description={product.description}
              price={product.price}
              imageurl={product.imageurl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
