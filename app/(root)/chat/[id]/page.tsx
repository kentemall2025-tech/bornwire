import { RealtimeChat } from "@/components/realtime-chat";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await new Promise((resolve) => setTimeout(resolve, 10));
  const { roomName } = await searchParams;
  return (
    <div>
      <RealtimeChat username={params.id} roomName={roomName as string} />
    </div>
  );
}
