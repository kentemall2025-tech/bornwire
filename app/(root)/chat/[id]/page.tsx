import { RealtimeChat } from "@/components/realtime-chat";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-4">
      {/* foijawoifjio */}
      <RealtimeChat username="fake user name" roomName={`${id}`} />
    </div>
  );
}
