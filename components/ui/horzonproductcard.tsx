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

export default function HorizontalProductCard({
  label,
  description,
  price,
  imageurl,
}: ProductCardProps) {
  return (
    <Card
      key={label}
      className="flex w-full max-w-md rounded-lg border w-[280px] h-[280px]  hover:shadow-xl transition-shadow duration-300 rounded-lg bg-gray p-0 bg-white hover:translate-y-0.5 duration-300 ease-out cursor-pointer "
    >
      <CardContent className=" flex flex-col  w-full h-full p-0 m-0 bg-white ">
        <div className="relative w-full h-80 p-4 m-0 overflow-hidden rounded-md bg-muted object-contain">
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
          <div className=" text-gray-600 ml-18 text-sm ">
            GHS {price.toFixed(2)} {/* Format price as GHS */}
          </div>
        </div>
        <div className=" w-full flex items-center bg-yellow-500 bg-gradient-to-r from-orange-400 shadow-xl cursor-pointer hover:-translate-y-0.5 text-center justify-center  text-lg p-2 bg-white mx-auto cursor-pointer">
          <Link className="w-full " href={`\products\${item.id}`}>
            <div className="tracking-wider text-white font-bold  cursor-pointer ">
              buy
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
