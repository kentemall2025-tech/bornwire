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

interface ProductCardProps {
  label: string;
  description?: string;
  price: number; // Price in GHS
  imageurl: string;
}

export default function HorizontalProductCard({
  label,
  description,
  price,
  imageurl,
}: ProductCardProps) {
  return (
    <Card className="flex w-full max-w-xs rounded-lg border p-4 hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative w-32 h-32 overflow-hidden rounded-md bg-muted">
        <Image src={imageurl} alt={label} layout="fill" objectFit="cover" />
      </div>

      {/* Product Details */}
      <CardContent className="ml-4 flex-1">
        {/* Title */}
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{label}</CardTitle>
        </CardHeader>

        {/* Description */}
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>

        {/* Price */}
        <div className="mt-2 flex items-center">
          <Badge variant="outline" className="text-sm">
            GHS {price.toFixed(2)} {/* Format price as GHS */}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
