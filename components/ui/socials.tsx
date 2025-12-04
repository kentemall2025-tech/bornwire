"use client";

import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Socials() {
  return (
    <div className={cn("my-5")}>
      <div className="flex items-center justify-center gap-8 ">
        <Link
          className="text-yellow-500"
          href="https://www.facebook.com/bonewire.shop/"
        >
          <Facebook />
        </Link>
        <Link
          className="text-yellow-500"
          href="https://www.instagram.com/bornwire.shop/"
        >
          <Instagram />
        </Link>
        <Link className="text-yellow-500" href="">
          <WhatsApp />
        </Link>
      </div>
    </div>
  );
}
