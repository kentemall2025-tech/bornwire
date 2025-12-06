"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";

export default function RealTimeChat({ roomId }: any) {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
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

  const loadMessages = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("messages")
      .select("id, content, user_id, created_at")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    setMessages(data || []);
    setLoading(false);
    scrollBottom();
  };

  const scrollBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

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

  if (loading)
    return (
      <div className="p-4 text-orange-500 font-semibold">Loading chat...</div>
    );

  return (
    <div className="flex flex-col h-screen h-[70vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-orange-50 ">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg max-w-xs ${
              msg.is_admin
                ? "bg-orange-500 text-white ml-auto"
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
