"use client";
import { supabase } from "@/lib/supabase/supabase";
import { useState } from "react";
import { useRouter } from "next/router";
import useCountStore from "@/lib/useStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const { email: Email, setEmail } = useCountStore();
    setLoading(true);
    setError(null);

    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setEmail(user.user?.email as string);
      handleLogin(email, password);
    };

    return (
      <div className="bg-yellow-500">
        <div className="w-full mx-auto md:max-w-[60%] h-screen p-12 pt-20">
          <h4 className="text-lg mt-20 text-4xl text-center font-extrabold text-white">
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
                onChange={(e) => setEmail(e.target.value)}
                className="bg-yellow-500 p-2 rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col p-4 gap-2">
              <p className="text-lg font-bold tracking-wide">Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-yellow-500 p-2 rounded-lg"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error?.message}</p>}{" "}
            <div className="mx-auto mt-4">
              <button
                type="submit"
                className="bg-yellow-500 from-orange-500 rounded-lg px-8 bg-gradient-to-l p-2"
                disabled={loading}
              >
                {loading ? "Logging in ..." : "Log in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
}
