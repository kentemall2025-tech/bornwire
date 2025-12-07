"use client";

import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Socials() {
  return (
    <div className={cn("my-5")}>
      <div className="flex items-center justify-center gap-8 ">
        <Link
          className="text-yellow-500"
          href="https://www.facebook.com/bonewire.shop/"
        >
          <Image
            alt="facebook"
            width={100}
            height={100}
            src="/images/facebook.png"
          />
        </Link>
        <Link
          className="text-yellow-500"
          href="https://www.instagram.com/bornwire.shop/"
        >
          <Image
            alt="isntagram"
            width={100}
            height={100}
            src="/images/instagram.png"
          />
        </Link>
        <Link
          className="text-yellow-500"
          href="https://www.tiktok.com/bornwire.shop/"
        >
          <Image
            alt="Tiktok"
            width={100}
            height={100}
            src="/images/tiktok.png"
          />
        </Link>
      </div>
    </div>
  );
}
