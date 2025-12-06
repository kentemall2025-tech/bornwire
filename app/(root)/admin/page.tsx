"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadRooms();
  }, []);

  if (loading)
    return <div className="p-6 text-orange-500">Loading rooms...</div>;

  return (
    <div className="p-6 max-w-[80%] mx-auto">
      <h1 className="text-xl font-bold text-orange-600 mb-4">
        Admin — User Rooms
      </h1>

      <div className="space-y-5">
        {rooms.map((room: any) => (
          <Link
            key={room.id}
            href={`/chat/${room.id}`}
            className="flex items-center gap-8 p-4 border rounded-lg bg-white shadow hover:bg-orange-50"
          >
            <div className="flex gap-4 text-2xl">
              <Avatar className="bg-yellow-500">
                <AvatarFallback className="bg-yellow-500 p-4 capitalize">
                  {room?.name.slice("-", "@")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{room.name}</span>
            </div>
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
