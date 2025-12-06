import AdminRoomChat from "@/components/adminviewcard";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen max-w-[80%] mx-auto">
      <AdminRoomChat roomId={params.id} />
    </div>
  );
}
