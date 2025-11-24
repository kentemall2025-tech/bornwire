import Image from "next/image";
import TitleTag from "./title";
import SubTitleTag from "./subtitle";

interface aboutprops {
  title: string;
  message: string;
  imageurl: string;
}

function About() {
  return (
    <div className="p-0  md:max-w-5xl md:mx-auto">
      <div className="max-w-full w-100 md:max-w-[70%] h-100 p-4  overflow-hidden md:max-w-4xl md:mx-auto ">
        <Image
          alt="imager"
          src="https://csmVKgDmE8w3HyOt.public.blob.vercel-storage.com/WhatsApp Image 2025-11-22 at 9.36.51 PM.jpeg"
          width={500}
          height={400}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
      <div className="space-y-4 mt-6 p-4">
        <TitleTag
          className="text-2xl text-center font-extrabold text-yellow-500 uppercase  underline underline-offset-6"
          message="our story"
        />
        <SubTitleTag
          className="font-poppins text-lg  text-justify leading-7 tracking-wider md:text-center leading-7  tracking-wide"
          message="At Bornwire.Shop, each piece of Kente tells a story of dedication, culture, and tradition. Made by skilled artisans on manual looms, every thread is woven with care, reflecting the spirit of their ancestors. The weavers, through sweat and labor, preserve this ancient craft, infusing each design with meaning and history. Though slow and meticulous, the process ensures that every Kente cloth is a living testament to resilience and heritage. When you wear Kente from Bornwire.Shop, you carry not just a garment, but a piece of cultural legacy."
        />
      </div>
    </div>
  );
}

export default About;
