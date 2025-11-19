import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SiteNav } from "./menubar";

interface navbarprops {
  className?: string;
}
function NavBar({ className }: navbarprops) {
  return (
    <div
      className={cn(
        "flex items-center font-poppins max-w-[95%] object-contain justify-between gap-4 p-2",
        className
      )}
    >
      <div className="font-poppins text-lg text-yellow-500 md:text-2xl lowercase font-bold">
        born<span className="text-orange-500 uppercase font-bold">wire </span>
      </div>

      <SiteNav />
    </div>
  );
}

export default NavBar;
