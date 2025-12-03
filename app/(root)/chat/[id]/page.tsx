import RealtimeChat from "@/components/realtime-chat";

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const roomName = searchParams.roomName as string | undefined;
  const username = searchParams.username as string | undefined;

  if (!username || !roomName) {
    return <div>Missing username or room name</div>;
  }

  return (
    <div className="max-w-[80%] mx-auto mt-20">
      <RealtimeChat username={username} roomName={roomName} />
    </div>
  );
}
