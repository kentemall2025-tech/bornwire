"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);

    const { data: roomsData } = await supabase
      .from("rooms")
      .select("id, name, created_by, created_at");

    const results = [];

    for (const room of roomsData || []) {
      const { data: unread } = await supabase.rpc("unread_count", {
        roomid: room.id,
      });

      results.push({ ...room, unread });
    }

    setRooms(results);
    setLoading(false);
  };

  if (loading)
    return <div className="p-6 text-orange-500">Loading rooms...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-orange-600 mb-4">
        Admin — User Rooms
      </h1>

      <div className="space-y-3">
        {rooms.map((room: any) => (
          <Link
            key={room.id}
            href={`/admin/rooms/${room.id}`}
            className="flex items-center justify-between p-4 border rounded-lg bg-white shadow hover:bg-orange-50"
          >
            <span className="font-medium">{room.name}</span>

            {room.unread > 0 && (
              <span className="bg-orange-500 text-white px-3 py-1 text-sm rounded-full">
                {room.unread}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
