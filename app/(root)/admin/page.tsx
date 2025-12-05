"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    supabase
      .from("rooms")
      .select("*")
      .then(({ data }) => {
        setRooms(data || []);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Rooms</h1>

      <div className="space-y-3">
        {rooms.map((room: any) => (
          <Link
            key={room.id}
            href={`/admin/room/${room.id}`}
            className="block p-3 border rounded hover:bg-gray-100"
          >
            {room.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
