"use client";

import RealtimeChat from "@/components/realtime-chat";

export default function AdminChatPage({ params }: any) {
  return (
    <div className="max-w-[80%] mx-auto mt-10">
      <RealtimeChat roomId={params.id} />
    </div>
  );
}
