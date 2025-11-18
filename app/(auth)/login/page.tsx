"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function page() {
  const handleSignInWithGoogle = async () => {
    const error = await await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <div className="">
        <Button
          onClick={handleSignInWithGoogle}
          className="text-2xl font-bold capitalize  "
        >
          sign in with google
        </Button>
      </div>
    </div>
  );
}
