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
        "flex items-center max-w-[95%] object-contain justify-between gap-4 p-4",
        className
      )}
    >
      <div>bornwire</div>

      <SiteNav />
    </div>
  );
}

export default NavBar;
