"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProductCardProps {
  label: string;
  description?: string;
  price: number;
  imageurl: string;
}

export default function VerticalProductCard({
  label,
  description,
  price,
  imageurl,
}: ProductCardProps) {
  const initializePayment = async () => {
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "marcus@email.com",
        amount: price * 100,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data?.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    }
  };

  return (
    <Card
      key={label}
      className="flex w-full  rounded-lg border w-full hover:shadow-lg transition-shadow duration-300 rounded-lg bg-gray p-0 my-2 "
    >
      <CardContent className=" flex flex-col h-full w-full p-0 m-0  ">
        <div className="relative w-full h-50 p-0 m-0 overflow-hidden rounded-md bg-muted object-contain">
          <Image
            className={"rounded-lg w-full h-auto"}
            src={imageurl}
            alt={label}
            objectFit="cover"
            layout="fill"
          />
        </div>

        <div className="flex flex-col justify-center text-center shadow-xl p-4">
          <CardHeader className=" p-0 ">
            <CardTitle className="text-lg font-semibold uppercase">
              {label}
            </CardTitle>
          </CardHeader>

          {/* Description */}
          <CardDescription className="text-sm text-black  ">
            {description}
          </CardDescription>

          {/* Price */}
          <div className="text-muted-background text-lg">
            <Badge variant="outline" className="text-sm ">
              GHS {price.toFixed(2)} {/* Format price as GHS */}
            </Badge>
          </div>
        </div>

        <button
          className="bg-yellow-500  p-4 cursor-pointer"
          onClick={() => initializePayment()}
        >
          buy
        </button>
      </CardContent>
    </Card>
  );
}
