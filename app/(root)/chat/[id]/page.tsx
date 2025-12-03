import RealtimeChat from "@/components/realtime-chat";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const roomName = searchParams.roomName as string;
  const username = searchParams.username as string;

  return (
    <div className="max-w-[80%] mx-auto mt-20">
      <RealtimeChat username={username} roomName={roomName} />
    </div>
  );
}
