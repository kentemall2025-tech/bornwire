"use client";
import ImageBackground from "@/components/ui/imagebackground";
import Image from "next/image";
import TitleTag from "@/components/ui/title";
import SubTitleTag from "@/components/ui/subtitle";
import Btn from "@/components/ui/btn";
import ShowcaseCarousel from "@/components/ui/showcase";
import {
  servicesContent,
  showcaseContent,
  testimonialContent,
} from "@/lib/constants";
import Services from "@/components/ui/service";
import Videocomp from "@/components/ui/videocomp";
import Testimonials from "@/components/ui/testies";
import SearchBar from "@/components/ui/searchbar";
import About from "@/components/ui/about";

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
      <div className="p-4">
        <Videocomp
          className=""
          src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Video%202025-11-11%20at%201.19.37%20PM.mp4"
        />
      </div>
      <div className="mt-5">
        <Testimonials
          className="flex flex-col gap-4 p-4"
          testies={testimonialContent}
        />
      </div>
      <SearchBar />
      <About />
    </section>
  );
}
