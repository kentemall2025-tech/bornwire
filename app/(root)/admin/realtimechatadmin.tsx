"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



export default function RealtimeChatAdmin({ roomId }: any) {
  const [messages, setMessages] = useState<any>([]);
  const [content, setContent] = useState<any>("");
  // Load old messages
  const loadMessages = async () => {
    const { data }: any = await supabase
      .from("messages")
      .select(
        `
        id,
        content,
        created_at,
        user_id,
        profiles: user_id(email)
      `
      )
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    setMessages(data || []);
  };

  
  useEffect(() => {
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
        (payload) => {
          setMessages((prev: any) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  // Send message
  const sendMessage = async () => {
    if (!content.trim()) return;

    await supabase.from("messages").insert({
      content,
      room_id: roomId,
      // admin's user id is automatically applied via RLS
    });

    setContent("");
  };

  return (
    <div className="border rounded-lg p-4 h-[80vh] flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((m: any) => (
          <div key={m.id} className="p-2 border rounded">
            <p className="text-sm text-gray-500">{m.profiles?.email}</p>
            <p>{m.content}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Reply..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
