"use client";
import { cn } from "@/lib/utils";
import { SiteNav } from "./menubar";
import Image from "next/image";
import LoginBtn from "./login";
import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface navbarprops {
  className?: string;
}

function NavBar({ className }: navbarprops) {
  const [user, setUser] = useState();
  if (!user) {
    redirect("/login");
  }
  useEffect(() => {
    const runfunc = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
      } else {
        setUser((prev) => {
          user;
        });
      }
    };
    runfunc();
  }, [user]);

  return (
    <div
      className={cn(
        "flex items-center  font-poppins max-w-[90%] mx-auto  justify-between gap-4 p-2 ",
        className
      )}
    >
      <Link
        href="/"
        className="font-poppins text-lg text-yellow-500 object-contain md:text-2xl lowercase font-bold"
      >
        <Image
          src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-23%20at%2012.21.54%20AM.jpeg"
          alt=""
          className="h-10 w-10 rounded-lg oject-contain"
          width={500}
          height={400}
        />
      </Link>
      <div className=" pr-4 ">
        {user ? (
          <LoginBtn />
        ) : (
          <div className="flex gap-2">
            <SiteNav />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
