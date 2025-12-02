import RealtimeChat from "@/components/realtime-chat";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await new Promise((resolve) => setTimeout(resolve, 10));
  const { roomName, username } = await searchParams;
  return (
    <div>
      <RealtimeChat
        username={username as string}
        roomName={roomName as string}
      />
    </div>
  );
}
