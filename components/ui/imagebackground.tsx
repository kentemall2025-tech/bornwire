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
      className={cn("max-w-[100%] h-screen absolute inset-0 z-10 ", className)}
    >
      <Image
        width={1000}
        height={1000}
        src={imageurl}
        alt={imageurl}
        className=" w-full h-auto z-10 "
      />
    </div>
  );
}

export default ImageBackground;
