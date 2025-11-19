"use client";

import Video from "next-video";
import { cn } from "@/lib/utils";

interface videocompprops {
  className?: string;
  src: string;
}

function Videocomp(props: videocompprops) {
  return (
    <div className="w-full md:max-w-5xl bg-black/60 max-w-full h-auto rounded-xl  md:mx-auto   md:h-screen overflow-hidden">
      <Video
        className={cn(
          "rounded-xl shadow-xl shadow-yellow-500",
          props.className
        )}
        muted
        loop
        autoPlay
        src={props.src}
        width={800}
        height={540}
      />
    </div>
  );
}

export default Videocomp;
