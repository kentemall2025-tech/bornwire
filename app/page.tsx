"use client";
import ImageBackground from "@/components/ui/imagebackground";
import Image from "next/image";
import TitleTag from "@/components/ui/title";
import SubTitleTag from "@/components/ui/subtitle";
import Btn from "@/components/ui/btn";
import ShowcaseCarousel from "@/components/ui/showcase";
import { servicesContent, showcaseContent } from "@/lib/constants";
import Services from "@/components/ui/service";

export default function Home() {
  return (
    <section className="p-4 w-full max-w-full relative space-y-20">
      <div className=" w-full h-[70vh] ">
        <ImageBackground imageurl="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-11%20at%2011.05.56%20AM.jpeg" />
        <div className="z-50 w-full h-full space-y-5  inset-y-50  relative">
          <TitleTag
            message="kente mall"
            className="text-white text-4xl font-bold capitalize "
          />
          <SubTitleTag
            message="Your home of quality products, giving you the Ghana culture vibes and luxury of kente products"
            className="text-white  text-lg font-medium "
          />
          <Btn label="order now" className="" href="" />
        </div>
      </div>
      <div className="mt-20 relative">
        <ShowcaseCarousel arr={showcaseContent} />
      </div>
      <div>
        <Services services={servicesContent} />
      </div>
    </section>
  );
}
