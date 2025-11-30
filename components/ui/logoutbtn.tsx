"use client";
import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";

interface LogoutProps {
  className?: string;
}

function LogoutBtn({ className }: LogoutProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      // Optionally handle the error here (show an alert, etc.)
    }
  };

  return (
    <div>
      <Button
        onClick={handleLogout}
        className={cn("bg-yellow-500 text-sm capitalize", className)}
      >
        Log out
      </Button>
    </div>
  );
}

export default LogoutBtn;
