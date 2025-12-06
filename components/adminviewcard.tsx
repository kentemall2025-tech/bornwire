"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function AdminRoomChat({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [adminId, setAdminId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Load ADMIN user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAdminId(data?.user?.id ?? null);
    });
  }, []);

  // Load history
  const loadHistory = useCallback(async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        id,
        content,
        user_id,
        room_id,
        created_at,
        profiles:user_id ( email )
      `
      )
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (!error) {
      setMessages(
        data?.map((m: any) => ({
          ...m,
          email: m.profiles?.email || "Unknown",
        })) || []
      );

      scrollToBottom();
    }
  }, [roomId]);

  // Realtime subscribe
  const subscribeRealtime = useCallback(() => {
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
          const msg = payload.new;

          // get email of sender
          const { data: profile } = await supabase
            .from("profiles")
            .select("email")
            .eq("id", msg.user_id)
            .single();

          setMessages((prev) => [
            ...prev,
            { ...msg, email: profile?.email || "Unknown" },
          ]);

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

      // auth realtime
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
    if (!newMessage.trim() || !adminId) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      user_id: adminId,
      content: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[50%] p-4 bg-gray-500">
      {/* CHAT */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 h-[40vh]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl max-w-[80%] ${
              msg.user_id === adminId
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            <p className="text-xs opacity-60 mb-1">{msg.email}</p>
            <p>{msg.content}</p>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div className="flex items-center gap-2 mt-3">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Reply to user…"
        />
        <Button onClick={sendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
