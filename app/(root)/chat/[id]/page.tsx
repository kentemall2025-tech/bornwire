"use client";
import RealtimeChat from "@/components/realtime-chat";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const roomName = (searchParams.roomName as string) || params.id;
  const username = (searchParams.username as string) || "Guest";

  return (
    <div className="max-w-[80%] mx-auto mt-20">
      <RealtimeChat username={username} roomName={roomName} />
    </div>
  );
}
