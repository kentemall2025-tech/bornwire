"use client";

import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Socials() {
  return (
    <div className={cn("my-5")}>
      <div className="flex items-center justify-center gap-8 p-4 ">
        <Link
          className="text-yellow-500 cursor-pointer"
          href="https://www.facebook.com/bonewire.shop/"
        >
          <Image
            alt="facebook"
            width={40}
            height={40}
            src="/images/facebook.png"
          />
        </Link>
        <Link
          className="text-yellow-500 cursor-pointer"
          href="https://www.instagram.com/bornwire.shop/"
        >
          <Image
            alt="isntagram"
            width={40}
            height={40}
            src="/images/instagram.png"
          />
        </Link>
        <Link
          className="text-yellow-500 cursor-pointer"
          href="https://www.tiktok.com/bornwire.shop/"
        >
          <Image
            alt="Tiktok"
            width={40}
            height={40}
            src="/images/social-media.png"
          />
        </Link>
      </div>
    </div>
  );
}
