"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface imagebackgroundprops {
  className?: string;
  imageurl: string;
}

function ImageBackground({ imageurl, className }: imagebackgroundprops) {
  return (
    <div
      className={cn(
        "max-w-full h-screen md:h-auto absolute inset-0  ",
        className
      )}
    >
      <Image
        width={1200}
        height={1000}
        src={imageurl}
        alt={imageurl}
        className=" w-full h-auto md:h-screen  z-10 object-cover"
      />
    </div>
  );
}

export default ImageBackground;
