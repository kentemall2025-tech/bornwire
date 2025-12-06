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

  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomName) return;

      let { data: room } = await supabase
        .from("rooms")
        .select("*")
        .eq("name", roomName)
        .maybeSingle();

      if (!room) {
        const { data: newRoom } = await supabase
          .from("rooms")
          .insert({ name: roomName })
          .select()
          .single();

        room = newRoom;
      }

      setRoomId(room.id);
    };

    fetchRoom();
  }, [roomName]);

  // ------------------------------------------------------
  // Load messages + join profiles
  // ------------------------------------------------------
  const loadMessages = async () => {
    setLoading(true);

    const { data, error } = await supabase
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

    if (error) console.error("LOAD ERROR:", error);

    setMessages(data || []);
    setLoading(false);
    scrollBottom();
  };

  // ------------------------------------------------------
  // Realtime listener
  // ------------------------------------------------------
  useEffect(() => {
    if (!roomId) return;

    loadMessages();

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
        async (payload) => {
          // fetch complete message WITH profiles.email
          const { data } = await supabase
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
            .eq("id", payload.new.id)
            .single();

          setMessages((prev: any) => [...prev, data]);
          scrollBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

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

  const scrollBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // ------------------------------------------------------
  // UI
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
            <div className="text-xs text-gray-400">{msg.profiles?.email}</div>
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
