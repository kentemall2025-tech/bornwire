"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
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

interface Props {
  roomName: string;
  username: string;
}

export default function RealtimeChat({ roomName, username }: Props) {
  const { containerRef, scrollToBottom } = useChatScroll();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);

  // ────────────────────────────────────────────
  //  Create room or fetch existing
  // ────────────────────────────────────────────
  const ensureRoom = useCallback(async () => {
    const { data: existing } = await supabase
      .from("rooms")
      .select("id")
      .eq("name", roomName)
      .maybeSingle();

    if (existing) return setRoomId(existing.id);

    const { data: newRoom } = await supabase
      .from("rooms")
      .insert({ name: roomName })
      .select()
      .single();

    if (newRoom) setRoomId(newRoom.id);
  }, [roomName]);

  const loadHistory = useCallback(async (rid: string) => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", rid)
      .order("created_at", { ascending: true });

    if (data) setMessages(data);
  }, []);

  // ────────────────────────────────────────────
  // Realtime subscription
  // ────────────────────────────────────────────
  const subscribeRealtime = useCallback((rid: string) => {
    const channel = supabase.channel(`room-${rid}`);

    channel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        setMessages((prev) => [...prev, payload.new as ChatMessage]);
      }
    );

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") setConnected(true);
    });

    return channel;
  }, []);

  useEffect(() => {
    ensureRoom();
  }, [ensureRoom]);

  useEffect(() => {
    if (!roomId) return;

    loadHistory(roomId);
    const channel = subscribeRealtime(roomId);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, loadHistory, subscribeRealtime]);

  // ────────────────────────────────────────────
  // Send message
  // ────────────────────────────────────────────
  const sendMessage = async () => {
    if (!roomId || !newMessage.trim()) return;

    await supabase.from("messages").insert({
      content: newMessage,
    });

    setNewMessage("");
  };

  // ────────────────────────────────────────────
  // Sort messages
  // ────────────────────────────────────────────
  const sortedMessages = useMemo(
    () =>
      [...messages].sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [messages]
  );

  useEffect(() => {
    scrollToBottom();
  }, [sortedMessages, scrollToBottom]);

  // ────────────────────────────────────────────
  // UI
  // ────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[85vh] max-w-2xl w-full mx-auto mt-6 rounded-2xl bg-gray-50 border shadow">
      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-t-2xl"
      >
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

      {/* Input Section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-3 p-3 bg-gray-100 border-t rounded-b-2xl"
      >
        <Input
          type="text"
          placeholder={connected ? "Type your message..." : "Connecting..."}
          className="flex-1 rounded-full bg-white shadow-sm px-4 py-2"
          value={newMessage}
          disabled={!connected}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <Button
          type="submit"
          className="rounded-full px-4 py-2"
          disabled={!connected || !newMessage.trim()}
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
