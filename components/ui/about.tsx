import Image from "next/image";
import React from "react";
import TitleTag from "./title";
import SubTitleTag from "./subtitle";

interface aboutprops {
  title: string;
  message: string;
  imageurl: string;
}

function About() {
  return (
    <div className="p-4">
      <div className="max-w-full h-auto">
        <Image
          alt="imager"
          src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-11%20at%2011.05.56%20AM.jpeg"
          width={500}
          height={500}
        />
      </div>
      <div className="space-y-4 mt-6">
        <TitleTag
          className="text-2xl font-extrabold text-yellow-500 uppercase  underline underline-offset-6"
          message="our story"
        />
        <SubTitleTag
          className="font-poppins text-lg text-pretty leading-7 tracking-wide"
          message="At Bornwire.Shop, each piece of Kente tells a story of dedication, culture, and tradition. Made by skilled artisans on manual looms, every thread is woven with care, reflecting the spirit of their ancestors. The weavers, through sweat and labor, preserve this ancient craft, infusing each design with meaning and history. Though slow and meticulous, the process ensures that every Kente cloth is a living testament to resilience and heritage. When you wear Kente from Bornwire.Shop, you carry not just a garment, but a piece of cultural legacy."
        />
      </div>
    </div>
  );
}

export default About;
