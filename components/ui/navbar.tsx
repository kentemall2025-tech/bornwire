"use client";
import { cn } from "@/lib/utils";
import { SiteNav } from "./menubar";
import Image from "next/image";
import LoginBtn from "./login";
import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

interface navbarprops {
  className?: string;
}

function NavBar({ className }: navbarprops) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      // Get the current session's user (if logged in)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // Listen for auth state changes and update user state
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user ?? null); // Update user state when auth changes
        }
      );

      // Cleanup listener on component unmount
      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    // Initial user check when the component mounts
    checkUser();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      className={cn(
        "flex items-center font-poppins max-w-[90%] mx-auto justify-between gap-4 p-2",
        className
      )}
    >
      <Link
        href="/"
        className="font-poppins text-lg text-yellow-500 rounded-lg object-contain md:text-2xl lowercase font-bold"
      >
        <Image
          src="https://csmvkgdme8w3hyot.public.blob.vercel-storage.com/WhatsApp%20Image%202025-11-23%20at%2012.21.54%20AM.jpeg"
          alt=""
          className="h-10 w-10 rounded-lg object-contain"
          width={500}
          height={400}
        />
      </Link>

      {/* Conditional rendering of LoginBtn or SiteNav based on user state */}
      <div className="pr-4">
        {!user ? (
          <LoginBtn /> // Show LoginBtn when no user is logged in
        ) : (
          <div className="flex gap-2">
            <SiteNav /> // Show SiteNav when user is logged in
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
