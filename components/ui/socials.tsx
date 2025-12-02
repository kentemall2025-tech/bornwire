"use client";

import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Socials() {
  return (
    <div className={cn("my-5")}>
      <div className="flex items-center justify-center gap-8 ">
        <Link href="">
          <Facebook />
        </Link>
        <Instagram />
        <WhatsApp />
      </div>
    </div>
  );
}
