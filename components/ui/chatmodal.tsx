"use client";
import { Button } from "./button";
// components/ChatModal.tsx
import { Dialog, DialogClose, DialogContent } from "./dialog"; // Shadcn Dialog component for modal
import { useEffect } from "react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when the modal is open
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full sm:w-[400px] h-[90vh] sm:h-screen  bg-white rounded-lg shadow-lg p-4">
        <DialogClose className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          X
        </DialogClose>
        <h2 className="text-xl font-semibold mb-4">Chat with us</h2>
        {/* Chat content goes here */}
        <div className="flex flex-col h-full ">
          <div className="h-full ">
            {/* Render messages here */}
            <p className="">Welcome to our support chat!</p>
            {/* More chat messages */}
          </div>
          <div className="w-full flex  gap-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="border-t  w-full bg-red-500 rounded-lg p-2"
            />
            <Button>send</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
