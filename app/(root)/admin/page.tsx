"use client";

import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    const { data: roomsData, error } = await supabase
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    // Fetch emails for each room creator
    const enriched: any = await Promise.all(
      roomsData.map(async (room) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .eq("id", room.created_by)
          .single();

        return {
          ...room,
          email: profile?.email || "Unknown user",
        };
      })
    );

    setRooms(enriched);
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
          <p className="font-semibold">{room.email}</p>
          <p className="text-gray-500 text-sm">{room.name}</p>
        </Link>
      ))}
    </div>
  );
}
