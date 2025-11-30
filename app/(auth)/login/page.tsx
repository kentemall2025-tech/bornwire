"use client";

import { Button } from "@/components/ui/button"; // Button component, can be used instead of the default button
import { supabase } from "@/lib/supabase/supabase"; // Make sure your Supabase config is correct
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle sign up
  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    router.push("/");
    if (error) throw error;
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp(email, password);
    router.push("/");
  };

  return (
    <div className=" bg-yellow-500 ">
      <div className="w-full mx-auto md:max-w-[60%]  h-screen  p-12 pt-20">
        <h4 className="text-lg mt-20  py-10 text-4xl text-center font-extrabold text-white">
          Bornwire
        </h4>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 bg-white p-4 rounded-lg"
        >
          <div className="flex flex-col gap-2 p-4">
            <p className="text-xl font-bold tracking-wide">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input change
              className="bg-yellow-500 p-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col p-4 gap-2">
            <p className="text-lg font-bold tracking-wide">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password input change
              className="bg-yellow-500 p-2 rounded-lg"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          <div className="mx-auto mt-4">
            <button
              type="submit"
              className="bg-yellow-500 from-orange-500 rounded-lg px-8 bg-gradient-to-l p-2"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
