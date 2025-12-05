"use client";

import RealtimeChat from "@/components/realtime-chat";

interface PageProps {
  searchParams?: {
    roomId?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  const roomId = searchParams?.roomId ?? "";

  return (
    <div className="max-w-[80%] mx-auto mt-10">
      <RealtimeChat roomId={roomId} />
    </div>
  );
}
