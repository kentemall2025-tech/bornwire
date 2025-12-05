"use client";

import RealtimeChat from "@/components/realtime-chat";

export default function UserChatPage({ params }: any) {
  const { id } = params; // roomId

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Your Chat</h1>

      <RealtimeChat roomName={id} />
    </div>
  );
}
