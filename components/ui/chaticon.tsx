"use client";

import { supabase } from "@/lib/supabase/supabase";
import { MessageCircle } from "lucide-react"; // Importing the chat icon from lucide-react

import Link from "next/link";
import { useEffect, useState } from "react";

export const ChatIcon = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
  });

  return (
    <Link
      href={`/chat/${user?.email}?roomName=${user?.id}`}
      className="fixed bottom-4 right-5  bg-yellow-500 bg-gradient-to-r from-orange-500  text-white shadow-lg hover:bg-blue-400 text-3xl z-50 rounded-lg bg-blue-500 "
    >
      <div className="w-12 h-12 object-contain p-2 ">
        <MessageCircle className="object-contain" size={30} />
      </div>
    </Link>
  );
};
