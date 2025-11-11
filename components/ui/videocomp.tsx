"use client";

import React from "react";
import Video from "next-video";
import { cn } from "@/lib/utils";

interface videocompprops {
  className?: string;
  src: string;
}

function Videocomp(props: videocompprops) {
  return (
    <div>
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
