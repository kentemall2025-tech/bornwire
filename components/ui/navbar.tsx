"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "./menubar";
import LoginBtn from "./login";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { Avatar, AvatarImage } from "./avatar";

interface NavbarProps {
  className?: string;
}

function NavBar({ className }: NavbarProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();

    const avatar =
      user?.user_metadata.picture || user?.user_metadata.avatar_url;
  }, []);

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
        <div className="flex ">
          <Image
            src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp Image 2025-11-23 at 12.21.54 AM.jpeg"
            width={500}
            alt="logo"
            className="h-10 w-10 rounded-lg object-contain"
            height={400}
          />
          <p className="capitalize font-bold text-lg text-yellow-black">
            Born{" "}
            <p className="text-yellow-500 font-extrabold capitalize">wire</p>
          </p>
        </div>
      </Link>

      <div className="flex  gap-2 flex-row-reverse">
        {user ? (
          <div className="flex flex-row-reverse p-2 gap-2 items-center">
            <Avatar className="bg-yellow-500 ">
              <AvatarImage
                src={
                  user?.user_metadata.picture || user?.user_metadata.avatar_url
                }
                alt={"avatar"}
                width={50}
                height={50}
              />
            </Avatar>

            <SiteNav />
          </div>
        ) : (
          <LoginBtn />
        )}
      </div>
    </div>
  );
}

export default NavBar;
