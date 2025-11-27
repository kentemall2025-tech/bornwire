"use client";
import { RealtimeChat } from "@/components/realtime-chat";

export default function page() {
  return (
    <div className="">
      <RealtimeChat roomName="discussion" username="marcus" />
    </div>
  );
}
