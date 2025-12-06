"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function AdminRoomChat({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Load history
  const loadHistory = useCallback(async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(data || []);
      scrollToBottom();
    }
  }, [roomId]);

  // Realtime subscribe
  const subscribeRealtime = useCallback(() => {
    const channel = supabase
      .channel(`room_${roomId}`)
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
          scrollToBottom();
        }
      )
      .subscribe();

    return channel;
  }, [roomId]);

  // Setup realtime + auth
  useEffect(() => {
    if (!roomId) return;

    const setup = async () => {
      const session = await supabase.auth.getSession();

      if (session?.data?.session?.access_token) {
        supabase.realtime.setAuth(session.data.session.access_token);
      }

      await loadHistory();
      const channel = subscribeRealtime();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    setup();
  }, [roomId, loadHistory, subscribeRealtime]);

  // Send message as ADMIN
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      message: newMessage,
      sender_email: "ADMIN",
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl max-w-[80%] ${
              msg.sender_email === "ADMIN"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            <p className="text-sm opacity-70 mb-1">
              {msg.sender_email === "ADMIN" ? "Admin" : msg.sender_email}
            </p>
            <p>{msg.message}</p>
          </div>
        ))}

        <div ref={scrollRef} />
      </div>

      {/* INPUT BAR */}
      <div className="flex items-center gap-2 mt-3">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Reply to this user..."
        />
        <Button onClick={sendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
