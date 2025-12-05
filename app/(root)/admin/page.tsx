"use client";

import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [rooms, setRooms] = useState<any>([]);

  const loadRooms = async () => {
    // Get room id + email of creator
    const { data, error } = await supabase
      .from("rooms")
      .select(
        `
        id,
        name,
        profiles:created_by(email)
      `
      )
      .order("created_at", { ascending: false });

    if (!error) setRooms(data);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold">Admin Rooms</h1>

      {rooms.map((room: any) => (
        <Link
          key={room.id}
          href={`/admin/room/${room.id}?roomId=${room.id}`}
          className="block p-4 border rounded-lg hover:bg-gray-100"
        >
          <p className="font-semibold">{room.profiles?.email}</p>
          <p className="text-gray-500 text-sm">{room.name}</p>
        </Link>
      ))}
    </div>
  );
}
