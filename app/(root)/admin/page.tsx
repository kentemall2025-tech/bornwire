"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import MessageCard from "./messagecard";

interface Room {
  id: string;
  created_at: string;
  name: string;
  created_by: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch rooms the user is allowed to see
  const loadRooms = async () => {
    const { data, error } = await supabase.from("rooms").select("*");

    if (error) {
      console.log("Error loading rooms:", error);
    } else {
      setRooms(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadRooms();

    // Realtime updates
    const channel = supabase
      .channel("rooms-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        () => loadRooms()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading rooms…</p>;

  if (rooms.length === 0)
    return <p className="text-center text-gray-500">No rooms yet.</p>;

  return (
    <div className="space-y-3 p-4">
      {rooms.map((room) => (
        <MessageCard key={room.id} {...room} />
      ))}
    </div>
  );
}
