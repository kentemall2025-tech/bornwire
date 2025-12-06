"use client";

import RealtimeChat from "@/components/realtime-chat";

export default function AdminRoomPage({ params }: any) {
  return (
    <div className="p-4">
      <h1 className="font-bold text-xl mb-4">Chat Room</h1>

      <RealtimeChat roomId={params.id} />
    </div>
  );
}
