"use client";

import RealtimeChat from "@/components/realtime-chat";

export default function AdminRoomPage({ searchParams }: any) {
  const roomId = searchParams.roomId;

  return (
    <div className="max-w-[80%] mx-auto mt-10">
      <RealtimeChat roomName={roomId} />
    </div>
  );
}
