"use client";

import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    const loadRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select(
          `
          id,
          name,
          created_at,
          profiles:created_by(email)
        `
        )
        .order("created_at", { ascending: false });

      if (!error) setRooms(data);
    };

    loadRooms();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Admin Rooms</h1>

      {rooms.map((room) => (
        <Link
          key={room.id}
          href={`/admin/room/${room.id}`}
          className="block p-4 border rounded-lg hover:bg-gray-100"
        >
          <p className="font-semibold">{room.profiles?.email}</p>
          <p className="text-gray-500 text-sm">{room.name}</p>
        </Link>
      ))}
    </div>
  );
}
// rthis isaofjioaewfjoijeofiajeiofjoi
