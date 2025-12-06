"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";

export default function RealTimeChat({ roomName }: any) {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState<string | null>(null);
  const scrollRef = useRef<any>(null);
  const adminId = "c3e8b126-a00d-4365-9466-420aae97eae4";

  // ------------------------------------------------------
  // 1️⃣ Load roomId from room name — Auto-creates room
  // ------------------------------------------------------
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomName) return;

      console.log("Requested room name:", roomName);

      let { data: room, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("name", roomName)
        .maybeSingle(); // prevents crashes

      // If room doesn't exist → Auto-create it
      if (!room) {
        console.log("Room not found, creating it…");

        const { data: newRoom, error: createError } = await supabase
          .from("rooms")
          .insert({
            name: roomName,
            owner_email: "auto-created",
          })
          .select()
          .single();

        if (createError) {
          console.error("Failed to create room:", createError);
          return;
        }

        room = newRoom;
      }

      setRoomId(room.id);
    };

    fetchRoom();
  }, [roomName]);

  // ------------------------------------------------------
  // 2️⃣ Load messages when roomId is ready
  // ------------------------------------------------------
  useEffect(() => {
    if (!roomId) return;

    loadMessages();
    markRoomAsRead();

    const channel = supabase
      .channel(`room-${roomId}`)
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
          scrollBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // ------------------------------------------------------
  // Load existing messages
  // ------------------------------------------------------
  const loadMessages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (error) console.error("Message load error:", error);

    setMessages(data || []);
    setLoading(false);
    scrollBottom();
  };

  const scrollBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // ------------------------------------------------------
  // Sending messages
  // ------------------------------------------------------
  const sendMessage = async () => {
    if (!input.trim() || !roomId) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("messages").insert({
      room_id: roomId,
      content: input,
      user_id: user?.id,
    });

    setInput("");
  };

  // ------------------------------------------------------
  // Mark room as read for unread tracking
  // ------------------------------------------------------
  const markRoomAsRead = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("room_reads").upsert({
      room_id: roomId,
      user_id: user?.id,
      last_read_at: new Date().toISOString(),
    });
  };

  // ------------------------------------------------------
  // Render UI
  // ------------------------------------------------------
  if (!roomId)
    return (
      <div className="p-4 text-orange-500 font-semibold">Loading room…</div>
    );

  if (loading)
    return (
      <div className="p-4 text-orange-500 font-semibold">Loading chat…</div>
    );

  return (
    <div className="flex flex-col h-screen h-[60vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-orange-50">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg max-w-xs ${
              msg.user_id === adminId
                ? "bg-black text-white ml-auto"
                : "bg-white border border-orange-200"
            }`}
          >
            {msg.content}
          </div>
        ))}

        <div ref={scrollRef} />
      </div>

      <div className="p-3 flex gap-2 border-t bg-white">
        <input
          className="flex-1 border p-2 rounded-lg"
          placeholder="Write a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
