"use client";

import Video from "next-video";
import { cn } from "@/lib/utils";

interface videocompprops {
  className?: string;
  src: string;
}

function Videocomp(props: videocompprops) {
  return (
    <div className="w-full  h-[70vh] md:h-screen overflow-hidden">
      <Video
        className={cn("", props.className)}
        muted
        loop
        autoPlay
        src={props.src}
      />
    </div>
  );
}

export default Videocomp;
