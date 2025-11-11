import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

interface navbarprops {
  className?: string;
}
function NavBar({ className }: navbarprops) {
  return (
    <div
      className={cn("flex items-center justify-between gap-4 p-4", className)}
    >
      <div>bornwire</div>
      <div className="flex items-center gap-4 capitalize font-sm ">
        <Link href="">home</Link>
        <Link href="">products</Link>
        <Link href="">history</Link>
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
}

export default NavBar;
