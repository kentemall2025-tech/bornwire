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
      className="w-full max-w-full  z-50 p-10 bg-white  "
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="max-w-full   bg-white  ">
        {props.arr.map((item, index) => (
          <CarouselItem key={index} className="p-0">
            <div className="p-0 max-w-full ">
              <Card className="mx-4 md:mx-auto md:w-[80%] p-0 shadow-lg  rounded-lg">
                <CardContent className="flex rounded-2xl w-full items-center  justify-center md:block p-0">
                  <div className="max-w-full h-auto shadow-lg shadow-yellow-500">
                    <Image
                      src={item.imageurl}
                      alt={item.imageurl}
                      width={1000}
                      height={500}
                      className="w-full h-auto  rounded-2xl p-0 object-cover"
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
