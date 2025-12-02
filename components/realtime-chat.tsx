"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { ChatMessageItem } from "@/components/chat-message";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export interface ChatMessage {
  id: string;
  room_id: string;
  user: string;
  content: string;
  created_at: string;
}

interface RealtimeChatProps {
  roomName: string;
  username: string;
}

export default function RealtimeChat({
  roomName,
  username,
}: RealtimeChatProps) {
  const { containerRef, scrollToBottom } = useChatScroll();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);

  // 1️⃣ Ensure room exists or create it
  const initRoom = useCallback(async () => {
    const { data: room, error } = await supabase
      .from("rooms")
      .select("id")
      .eq("name", roomName)
      .maybeSingle();

    if (room) {
      setRoomId(room.id);
    } else {
      const { data: newRoom } = await supabase
        .from("rooms")
        .insert({ name: roomName })
        .select()
        .single();

      if (newRoom) setRoomId(newRoom.id);
    }
  }, [roomName]); // ← missing bracket fixed here!

  // 2️⃣ Load chat history
  const loadMessages = useCallback(async (rid: string) => {
    const { data, error } = await supabase
      .from("messages") // ← FIXED
      .select("*")
      .eq("room_id", rid)
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data);
  }, []);

  // 3️⃣ Subscribe to realtime messages
  const subscribeRealtime = useCallback((rid: string) => {
    const channel = supabase.channel(`room-${rid}`);

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${rid}`,
      },
      (payload) => {
        console.log("Realtime message received:", payload);
        setMessages((prev) => [...prev, payload.new as ChatMessage]);
      }
    );

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") setConnected(true);
    });

    return channel;
  }, []);

  // 4️⃣ Initialize everything
  useEffect(() => {
    initRoom();
  }, [initRoom]);

  useEffect(() => {
    if (!roomId) return;
    loadMessages(roomId);
    const channel = subscribeRealtime(roomId);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, loadMessages, subscribeRealtime]);

  // 5️⃣ Send message (save to DB)
  const sendMessage = async () => {
    if (!newMessage.trim() || !roomId) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      user: username,
      content: newMessage,
    });

    setNewMessage("");
  };

  const sortedMessages = useMemo(
    () =>
      [...messages].sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [messages]
  );

  useEffect(() => {
    scrollToBottom();
  }, [sortedMessages, scrollToBottom]);

  return (
    <div className="flex flex-col h-[92vh] w-full bg-yellow-500">
      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {sortedMessages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={{
              id: msg.id,
              user: { name: msg.user },
              content: msg.content,
              createdAt: msg.created_at,
            }}
            isOwnMessage={msg.user === username}
            showHeader={true}
          />
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex w-full gap-2 border-t border-border p-4"
      >
        <Input
          className="rounded-full bg-white text-sm"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          disabled={!connected}
        />

        <Button type="submit" disabled={!connected || !newMessage.trim()}>
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
