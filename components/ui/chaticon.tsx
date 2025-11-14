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
    <>
      <Button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-400"
      >
        <MessageCircle size={24} />
      </Button>

      <ChatModal isOpen={isOpen} onClose={handleCloseChat} />
    </>
  );
};
