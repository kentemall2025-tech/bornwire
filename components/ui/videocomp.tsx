"use client";

import Video from "next-video";
import { cn } from "@/lib/utils";

interface videocompprops {
  className?: string;
  src: string;
}

function Videocomp(props: videocompprops) {
  return (
    <div className="w-full md:max-w-5xl lg:max-w-[80%] max-w-full h-auto rounded-lg  md:mx-auto  md:h-screen overflow-hidden shadow-lg shadow-yellow-500 p-0">
      <Video
        className={cn("object-cover p-0 w-full ", props.className)}
        muted
        loop
        autoPlay
        src={props.src}
        width={1000}
        height={850}
      />
    </div>
  );
}

export default Videocomp;
