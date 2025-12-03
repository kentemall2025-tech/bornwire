"use client";

import Video from "next-video";
import { cn } from "@/lib/utils";

interface videocompprops {
  className?: string;
  src: string;
}

export const Videocomp = (props: videocompprops) => {
  return (
    <div className="md:max-w-[90%]  mx-auto h-[50vh] md:object-contain">
      <Video
        className={cn("", props.className)}
        controls={false}
        muted={true}
        loop={true}
        autoPlay={true}
        src={props.src}
        width={1000}
        height={500}
      >
        <source src={props.src} />
      </Video>
    </div>
  );
};
