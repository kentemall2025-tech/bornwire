"use client";
import { supabase } from "@/lib/supabase/supabase";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function page({ params }: any) {
  const [product, setProduct] = useState<any>(null);
  const [id, setId] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();
  const initializePayment = async () => {
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        amount: product.price * 100,
      }),
    });

    const data = await res.json();

    if (data?.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
    const fetchproduct = async () => {
      const { id } = await params;

      setId(id);
      const { data: product, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();

      setProduct(product);
    };
    fetchproduct();
  }, []);

  return (
    <div className="">
      <section className="md:p-8 md:max-w-[80%] md:mx-auto">
        <div className="max-w-full h-[60vh] object-contain">
          <Image
            className="w-full h-[60vh] object-cover"
            src={
              product
                ? product?.imageurl
                : "https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp Image 2025-11-23 at 12.21.54 AM.jpeg"
            }
            alt={product?.label}
            width={500}
            height={500}
          />
        </div>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-extrabold  uppercase">
            {product?.label}
          </h2>
          <Badge variant="outline" className="text-sm">
            GHS {product?.price.toFixed(2)}
          </Badge>
        </div>
        <div className="max-w-[90%] py-5 text-center md: mx-auto">
          {product?.description}
        </div>
        <div className="flex w-full items-center">
          <button
            className="bg-yellow-500 w-full text-white uppercase p-4 "
            onClick={initializePayment}
          >
            Buy
          </button>
          <button
            onClick={() =>
              router.push(
                `/chat/${user?.id}?roomName=${user?.id}&username=${user?.email}`
              )
            }
            className="w-full bg-slate-900 text-yellow-500 uppercase text-white uppercase p-4"
          >
            chat us
          </button>
        </div>
      </section>
    </div>
  );
}
