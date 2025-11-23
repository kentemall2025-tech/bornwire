"use client";
// components/ChatIcon.tsx
import { MessageCircle } from "lucide-react"; // Importing the chat icon from lucide-react
import { useState } from "react";
import { ChatModal } from "./chatmodal"; // Importing the modal component
import { Button } from "./button";
export const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChat = () => setIsOpen(true);
  const handleCloseChat = () => setIsOpen(false);

  return (
    <div className="fixed -bottom-10 right-6  text-white shadow-lg hover:bg-blue-400 text-3xl z-50 rounded-lg bg-blue-500 ">
      <Button onClick={handleOpenChat} className="bg-transparent">
        <MessageCircle size={540} />
      </Button>

      <ChatModal isOpen={isOpen} onClose={handleCloseChat} />
    </div>
  );
};
