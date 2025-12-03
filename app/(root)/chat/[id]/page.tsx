"use client";

import RealtimeChat from "@/components/realtime-chat";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { id } = params;

  const roomName = searchParams.roomName as string;
  const username = searchParams.username as string;

  return (
    <div className="max-w-[80%] mx-auto mt-10">
      <RealtimeChat roomName={roomName} />
    </div>
  );
}
