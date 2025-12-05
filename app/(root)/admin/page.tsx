"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import MessageCard from "./messagecard";

interface Room {
  id: string;
  created_at: string;
  name: string; // email
  created_by: string;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error loading rooms:", error);
    } else {
      setRooms(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadRooms();

    const channel = supabase
      .channel("rooms-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "rooms" },
        loadRooms
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <p className="text-center">Loading…</p>;
  if (rooms.length === 0) return <p className="text-center">No rooms yet.</p>;

  return (
    <div className="space-y-3 p-4">
      {rooms.map((room) => (
        <MessageCard key={room.id} {...room} />
      ))}
    </div>
  );
}
