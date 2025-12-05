"use client";

import RealtimeChatAdmin from "../../realtimechatadmin";

export default function AdminRoomPage({ params }:any) {
  const roomId = params.id;

  return (
    <div className="max-w-[80%] mx-auto mt-10">
      <RealtimeChatAdmin roomId={roomId} />
    </div>
  );
}
