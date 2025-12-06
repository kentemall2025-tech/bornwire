import RealtimeChat from "@/components/realtime-chat";

export default async function AdminChatPage({ params }: any) {
  const { id } = await params;
  return (
    <div className="max-w-[80%] mx-auto mt-10">
      <RealtimeChat roomId={id} />
    </div>
  );
}
