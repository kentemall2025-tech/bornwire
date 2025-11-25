import { RealtimeChat } from "@/components/realtime-chat";

export default function page() {
  return (
    <div className="">
      <RealtimeChat roomName="my-chat-room" username="john_doe" />
    </div>
  );
}
