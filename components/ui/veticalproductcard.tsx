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
import { Button } from "./button";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  label: string;
  description?: string;
  price: number;
  imageurl: string;
}

export default function VerticalProductCard({
  id,
  label,
  description,
  price,
  imageurl,
}: ProductCardProps) {
  const router = useRouter();
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

    if (data?.data?.authorization_url) {
      window.location.href = data.data.authorization_url;
    }
  };

  return (
    <Card className="w-full rounded-lg border hover:shadow-lg transition-shadow duration-300 ">
      <CardContent className="flex flex-col h-full p-0">
        {/* IMAGE */}
        <div className="relative w-full h-52 overflow-hidden rounded-md bg-muted">
          <Image
            src={imageurl}
            alt={label}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex flex-col text-center p-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold uppercase">
              {label}
            </CardTitle>
          </CardHeader>

          <div>
            <Button
              onClick={() => router.push(`/products/${id}`)}
              className="text-sm bg-slate-900 text-yellow-500 "
            >
              more info
            </Button>
          </div>

          <div className="text-lg mt-2">
            <Badge variant="outline" className="text-sm">
              GHS {price.toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* BUY BUTTON */}
        <button
          className="bg-yellow-500 text-white uppercase p-4 "
          onClick={initializePayment}
        >
          Buy
        </button>
      </CardContent>
    </Card>
  );
}
