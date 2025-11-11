import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Cal_Sans } from "next/font/google";

interface btnprops {
  className?: string;
  label: string;
  href?: string;
}

function Btn(props: btnprops) {
  return (
    <Button
      className={cn(
        "bg-yellow-500 text-white font-bold  capitalize",
        props.className
      )}
    >
      {props.label}
    </Button>
  );
}

export default Btn;
