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
import FooterLinks from "@/components/ui/footerlinks";
import { ChatIcon } from "@/components/ui/chaticon";

export default function Home() {
  return (
    <section className=" w-full max-w-full relative space-y-20">
      <div className="w-full h-[60vh] z-10 ">
        <ImageBackground imageurl="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-11%20at%2011.05.56%20AM.jpeg" />
        <div className=" h-[80vh] md:h-[90vh] w-full bg-black/70 absolute  inset-0 z-2" />
        <div className=" z-50 w-full h-full space-y-10 md:space-y-6  inset-y-30  max-w-xl p-4 md:pl-10 md:pt-10 relative">
          <TitleTag
            message="kente mall"
            className="text-white text-4xl md:text-5xl uppercase font-poppins tracking-wide font-bold  "
          />
          <SubTitleTag
            message="Your home of quality products, giving you the Ghana culture vibes and luxury of kente products."
            className="text-white  text-lg md:text-xl font-medium leading-7 tracking-wide text-left font-poppins "
          />
          <Btn
            label="order now"
            className="text-lg tracking-wide font-bold w-full bg-yellow-500 hover:bg-yellow-500 cursor-pointer md:w-60"
            href=""
          />
        </div>
      </div>

      <ShowcaseCarousel arr={showcaseContent} />

      <div>
        <h2 className="text-4xl uppercase underline-offset-6  underline  font-bold font-poppins text-center  p-4">
          Services
        </h2>
        <Services services={servicesContent} />
      </div>
      <div className="p-4">
        <Videocomp src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Video%202025-11-11%20at%201.19.37%20PM.mp4" />
      </div>
      <div className="mt-5">
        <h2 className="text-4xl uppercase underline-offset-6  underline  font-bold font-poppins text-center  p-4">
          Testimonials
        </h2>
        <Testimonials
          className="flex flex-col gap-4 p-4"
          testies={testimonialContent}
        />
      </div>
      <SearchBar />
      <ChatIcon />
      <About />
      <FooterLinks />
    </section>
  );
}
