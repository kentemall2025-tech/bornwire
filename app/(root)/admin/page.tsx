"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("rooms")
        .select("id, owner_email, created_at");
      setRooms(data || []);
    };
    load();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Rooms</h1>

      <div className="space-y-3">
        {rooms.map((room: any) => (
          <Link
            key={room.id}
            href={`/admin/rooms/${room.id}`}
            className="block p-3 bg-gray-100 rounded shadow-sm"
          >
            {room.owner_email}
          </Link>
        ))}
      </div>
    </div>
  );
}
