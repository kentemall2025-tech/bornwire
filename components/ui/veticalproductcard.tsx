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
import Link from "next/link";

interface ProductCardProps {
  label: string;
  description?: string;
  price: number; // Price in GHS
  imageurl: string;
}

export default function VerticalProductCard({
  label,
  description,
  price,
  imageurl,
}: ProductCardProps) {
  return (
    <Card className="flex w-full  rounded-lg border w-full hover:shadow-lg transition-shadow duration-300 rounded-lg bg-gray p-0 my-2 ">
      <CardContent className=" flex flex-col h-full w-full p-0 m-0  ">
        <div className="relative w-full h-50 p-0 m-0 overflow-hidden rounded-md bg-muted object-contain">
          <Image
            className={"rounded-lg w-full h-auto"}
            src={imageurl}
            alt={label}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center  shadow-xl p-4">
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
        <Link
          className="text-lg bg-yellow-500 text-white p-2  bg-yellow-500 bg-gradient-to-r from-orange-400 text-center"
          href={`\product\${item.id}`}
        >
          view
        </Link>
      </CardContent>
    </Card>
  );
}
