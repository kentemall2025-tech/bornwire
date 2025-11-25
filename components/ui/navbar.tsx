"use client";
import { cn } from "@/lib/utils";
import { SiteNav } from "./menubar";
import Image from "next/image";
import LoginBtn from "./login";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface navbarprops {
  className?: string;
}
function NavBar({ className }: navbarprops) {
  const [user, setUser] = useState();

  useEffect(() => {
    const runfunc = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
      }

      setUser((prev) => {
        data;
      });
    };
    runfunc();
  }, [user]);

  console.log(user);
  return (
    <div
      className={cn(
        "flex items-center font-poppins max-w-[95%] object-contain justify-between gap-4 p-2",
        className
      )}
    >
      <div className="font-poppins text-lg text-yellow-500 md:text-2xl lowercase font-bold">
        <Image
          src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-23%20at%2012.21.54%20AM.jpeg"
          alt=""
          className="h-10 w-10 rounded-lg oject-contain"
          width={500}
          height={400}
        />
      </div>
      <div className="">{!user ? <LoginBtn /> : <SiteNav />} </div>
    </div>
  );
}

export default NavBar;
