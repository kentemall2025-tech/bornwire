import { RealtimeChat } from "@/components/realtime-chat";
import { RealtimeChannel } from "@supabase/supabase-js";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return (
    <div className="p-4">
      <RealtimeChat username="fake user name" roomName={`${id}`} />
    </div>
  );
}
