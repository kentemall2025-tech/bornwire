"use client";

import { Button } from "./button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

const LoginBtn = () => {
  const router = useRouter();
  const logout = () => supabase.auth.signOut();

  return (
    <Button
      onClick={() => {
        logout();

        router.replace("/");
      }}
      className="text-lg cursor-pointer  hover:bg-yellow-500 font-bold bg-yellow-500 text-white text-sm uppercase font-bold"
    >
      log out
    </Button>
  );
};

export default LoginBtn;
