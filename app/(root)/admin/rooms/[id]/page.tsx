"use client";

import { useParams } from "next/navigation";
import RealtimeChat from "@/components/realtime-chat";

export default function AdminRoomPage() {
  const params = useParams();
  const roomId = params?.id as string;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chat Room</h1>

      <RealtimeChat roomId={roomId} />
    </div>
  );
}
