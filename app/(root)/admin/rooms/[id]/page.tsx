"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";

export default function AdminRooms() {
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
    <div className="p-6">
      <h1 className="text-xl mb-4">All User Rooms</h1>

      <div className="space-y-3">
        {rooms.map((room: any) => (
          <Link
            key={room.id}
            href={`/chat/${room.id}`}
            className="block p-3 rounded bg-gray-200"
          >
            {room.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
