"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface imagee {
  id: string;
  imageurl: string;
}
interface showcaseprops {
  arr: imagee[];
  className?: string;
}

function ShowcaseCarousel(props: showcaseprops) {
  return (
    <Carousel
      className="w-full max-w-full  z-50"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="max-w-full">
        {props.arr.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-0 max-w-full">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <div className="max-w-full h-auto p-0">
                    <Image
                      src={item.imageurl}
                      alt={item.imageurl}
                      width={500}
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ShowcaseCarousel;
