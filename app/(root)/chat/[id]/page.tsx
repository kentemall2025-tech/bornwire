import RealtimeChat from "@/components/realtime-chat";
import { supabase } from "@/lib/supabase/supabase";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { roomName, username } = await searchParams;

  return (
    <div className="max-w-[80%] mx-auto mt-20">
      <RealtimeChat
        username={username as string}
        roomName={roomName as string}
      />
    </div>
  );
}
