import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Cal_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

interface btnprops {
  className?: string;
  label: string;
  href?: string;
}

function Btn(props: btnprops) {
  const router = useRouter();
  return (
    <div className="">
      <Button
        onClick={() => router.push(`${props.href}`)}
        className={cn(
          "bg-yellow-500 text-white font-bold  capitalize",
          props.className
        )}
      >
        {props.label}
      </Button>
    </div>
  );
}

export default Btn;
