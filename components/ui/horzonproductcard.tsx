"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";

interface ProductCardProps {
  label: string;
  description?: string;
  price: number; // Price in GHS
  imageurl: string;
}

export default function HorizontalProductCard({
  label,
  price,
  imageurl,
}: ProductCardProps) {
  const [user, setUser] = useState<any>(null);

  const initializePayment = async () => {
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user?.email,
        amount: price * 100,
      }),
    });

    const data = await res.json();
    console.log(data);

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
  }, []);

  return (
    <Card
      key={label}
      className="flex w-full max-w-md rounded-lg border w-[280px] h-[280px]  hover:shadow-xl transition-shadow duration-300 rounded-lg bg-gray p-0 bg-white hover:translate-y-0.5 duration-300 ease-out cursor-pointer "
    >
      <CardContent className=" flex flex-col  w-full h-full p-0 m-0 bg-white ">
        <div className="relative w-full h-100  p-4 m-0 overflow-hidden rounded-md bg-muted object-cover">
          <Image
            className={"rounded-lg w-full h-auto "}
            src={imageurl}
            alt={label}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col h-20 justify-center pt-4 shadow-xl p-2">
          <CardHeader className=" p-0 ">
            <CardTitle className="text-lg text-center font-semibold uppercase ">
              {label}
            </CardTitle>
          </CardHeader>
          <div className=" text-gray-600 ml-18 text-sm ">GHS {price}</div>
        </div>
        <button
          className="bg-yellow-500  text-white uppercase p-4 cursor-pointer"
          onClick={() => initializePayment()}
        >
          buy
        </button>
      </CardContent>
    </Card>
  );
}
