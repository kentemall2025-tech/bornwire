"use client";

import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import useCountStore from "@/lib/useStore";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { setEmail: setStoreEmail } = useCountStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.SITE_URL}/products`, // redirect after login
      },
    });

    if (error) {
    }
    setLoading(false);
  };

  return (
    <div className="bg-yellow-500">
      <div className="w-full mx-auto md:max-w-[60%] h-screen p-12 pt-20">
        <h4 className="text-lg mt-20 text-4xl text-center font-extrabold text-white">
          Bornwire
        </h4>

        <div className="flex flex-col gap-2 bg-white p-6 rounded-lg mt-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="bg-yellow-500 text-white rounded-lg px-8 p-3 bg-gradient-to-l from-orange-500 to-yellow-500 font-bold"
          >
            {loading ? "Redirecting..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}
