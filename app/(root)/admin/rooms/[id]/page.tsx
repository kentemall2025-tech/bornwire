import AdminRoomChat from "@/components/adminviewcard";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen">
      <AdminRoomChat roomId={params.id} />
    </div>
  );
}
