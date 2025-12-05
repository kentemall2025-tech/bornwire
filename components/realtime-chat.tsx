"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: { email: string } | null;
}

export default function RealtimeChat({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*, profiles(email)")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (!error) setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    const { data: user } = await supabase.auth.getUser();
    if (!user?.user) return;

    await supabase.from("messages").insert({
      content: newMsg,
      user_id: user.user.id,
      room_id: roomId,
    });

    setNewMsg("");
  };

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel(`messages-room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        loadMessages
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  return (
    <div className="border rounded-xl p-4 h-[500px] flex flex-col">
      {/* MESSAGES LIST */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 rounded-lg bg-accent">
            <div className="text-xs text-muted-foreground">
              {msg.profiles?.email || "Unknown user"}
            </div>
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-3">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
