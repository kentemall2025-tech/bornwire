"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "./menubar";
import LoginBtn from "./login";
import useCountStore from "@/lib/useStore";

interface NavbarProps {
  className?: string;
}

export const dynamic = "force-dynamic";

function NavBar({ className }: NavbarProps) {
  const { email } = useCountStore();

  return (
    <div
      className={cn(
        "flex items-center font-poppins max-w-[98%] mx-auto justify-between gap-4 p-2",
        className
      )}
    >
      <Link
        href="/"
        className="font-poppins text-lg text-yellow-500 rounded-lg object-contain md:text-2xl lowercase font-bold"
      >
        <Image
          src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-23%20at%2012.21.54%20AM.jpeg"
          alt="logo"
          className="h-10 w-10 rounded-lg object-contain"
          width={300}
          height={400}
        />
      </Link>
      <div className="flex  gap-2 flex-row-reverse">
        {email ? <SiteNav /> : <LoginBtn />}
      </div>
    </div>
  );
}

export default NavBar;
