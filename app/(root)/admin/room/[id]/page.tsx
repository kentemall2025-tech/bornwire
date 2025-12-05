"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";

export default function AdminRoomView({ params }: any) {
  const roomId = params.id;

  const [messages, setMessages] = useState<any>([]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      const { data, error }: any = await supabase
        .from("messages")
        .select(
          `
          id,
          content,
          created_at,
          user_id,
          profiles ( email )
        `
        )
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      if (!error) setMessages(data);
    };

    loadMessages();

    const channel = supabase
      .channel(`admin-room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages((prev: any) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-2">Admin View — Room {roomId}</h1>

      <div className="flex-1 overflow-y-auto border p-3 rounded space-y-3">
        {messages.map((m: any) => (
          <div key={m.id} className="p-2 border rounded">
            <div className="text-sm text-gray-500">
              {m.profiles?.email ?? m.user_id}
            </div>
            <div>{m.content}</div>
            <div className="text-xs text-gray-400">{m.created_at}</div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
