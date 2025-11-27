"use client";
// components/ChatIcon.tsx
import { MessageCircle } from "lucide-react"; // Importing the chat icon from lucide-react
import { useState } from "react";
import { Button } from "./button";
import Link from "next/link";
export const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChat = () => setIsOpen(true);
  const handleCloseChat = () => setIsOpen(false);

  return (
    <Link
      href={"/chat"}
      className="fixed bottom-4 right-5  bg-yellow-500 bg-gradient-to-r from-orange-500  text-white shadow-lg hover:bg-blue-400 text-3xl z-50 rounded-lg bg-blue-500 "
    >
      <div className="w-12 h-12 object-contain p-2 ">
        <MessageCircle className="object-contain" size={30} />
      </div>
    </Link>
  );
};
