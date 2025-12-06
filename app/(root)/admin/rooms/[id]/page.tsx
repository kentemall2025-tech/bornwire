"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";

export default function AdminRoomPage({ params }: any) {
  const roomId = params.id;
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load admin
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAdmin(data.user);
    });
  }, []);

  // Fetch messages
  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select(
          `
            id,
            content,
            created_at,
            user_id,
            profiles(email)
        `
        )
        .eq("room_id", roomId)
        .order("created_at", { ascending: true });

      setMessages(data || []);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    loadMessages();

    // Realtime listener
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
          setMessages((prev) => [...prev, payload.new]);
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!admin) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      user_id: admin.id,
      content: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col p-4 bg-gray-50">
      <h1 className="text-xl font-bold mb-4">Admin Chat</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2">
        {messages.map((msg) => {
          const isAdmin = msg.user_id === admin?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-2xl max-w-[70%] text-sm shadow
                  ${
                    isAdmin
                      ? "bg-orange-500 text-white"
                      : "bg-white border text-gray-900"
                  }
                `}
              >
                {!isAdmin && (
                  <p className="text-xs text-gray-600 mb-1 font-medium">
                    {msg.profiles?.email}
                  </p>
                )}
                {msg.content}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 p-3 border rounded-lg"
          placeholder="Reply to user..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="px-4 bg-orange-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
