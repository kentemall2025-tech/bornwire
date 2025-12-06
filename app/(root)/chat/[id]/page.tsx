"use client";

import RealtimeChat from "@/components/realtime-chat";

export default function Page({ params, searchParams }: any) {
  const { id } = params;

  return (
    <div className="max-w-[80%] mx-auto mt-10">
      <RealtimeChat roomName={id} />
    </div>
  );
}
