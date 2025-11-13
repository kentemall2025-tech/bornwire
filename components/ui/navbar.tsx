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
      className={cn(
        "flex items-center max-w-[95%] justify-between gap-4 p-4",
        className
      )}
    >
      <div>bornwire</div>
      <div className="flex items-center gap-4 capitalize font-sm ">
        <Link href="/">home</Link>
        <Link href="/products">products</Link>
        <Link href="/settings">settings</Link>
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
}

export default NavBar;
