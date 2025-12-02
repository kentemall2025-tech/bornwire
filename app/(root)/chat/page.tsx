import RealtimeChat from "@/components/realtime-chat";

export default function page() {
  return (
    <div className="w-full h-screen">
      <RealtimeChat roomName="discussion" username="marcus" />
    </div>
  );
}
