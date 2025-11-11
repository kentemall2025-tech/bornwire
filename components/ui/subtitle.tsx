import { cn } from "@/lib/utils";
import React from "react";

interface subtitleprops {
  message: string;
  className?: string;
}

function SubTitleTag(props: subtitleprops) {
  return (
    <div className="">
      <p className={cn("", props.className)}>{props.message}</p>
    </div>
  );
}

export default SubTitleTag;
