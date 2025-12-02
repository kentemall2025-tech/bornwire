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

  //----------------------------------------------------------------------
  // 1️⃣ Create room or fetch existing
  //----------------------------------------------------------------------
  const ensureRoom = useCallback(async () => {
    const { data: existing, error } = await supabase
      .from("rooms")
      .select("id")
      .eq("name", roomName)
      .maybeSingle();

    if (error) {
      console.error("ROOM ERROR:", error);
      return;
    }

    if (existing) {
      setRoomId(existing.id);
      return;
    }

    // create new room
    const { data: newRoom, error: createError } = await supabase
      .from("rooms")
      .insert({ name: roomName })
      .select()
      .single();

    if (createError) {
      console.error("ROOM CREATE ERROR:", createError);
      return;
    }

    setRoomId(newRoom.id);
  }, [roomName]);

  //----------------------------------------------------------------------
  // 2️⃣ Load chat history once
  //----------------------------------------------------------------------
  const loadHistory = useCallback(async (rid: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room_id", rid)
      .order("created_at", { ascending: true });

    if (error) console.error("LOAD HISTORY ERROR:", error);
    if (data) setMessages(data);
  }, []);

  //----------------------------------------------------------------------
  // 3️⃣ Subscribe to realtime updates ONLY once
  //----------------------------------------------------------------------
  const subscribeRealtime = useCallback((rid: string) => {
    const channel = supabase.channel(`room-${rid}`);

    channel.on(
      "postgres_changes",
      {
        schema: "public",
        table: "messages",
        event: "INSERT",
        filter: `room_id=eq.${rid}`,
      },
      (payload) => {
        setMessages((prev) => [...prev, payload.new as ChatMessage]);
      }
    );

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") setConnected(true);
    });

    return channel;
  }, []);

  //----------------------------------------------------------------------
  // INIT: Make sure room exists
  //----------------------------------------------------------------------
  useEffect(() => {
    ensureRoom();
  }, [ensureRoom]);

  //----------------------------------------------------------------------
  // When roomId becomes available, load messages + subscribe
  //----------------------------------------------------------------------
  useEffect(() => {
    if (!roomId) return;

    loadHistory(roomId);

    const channel = subscribeRealtime(roomId);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, loadHistory, subscribeRealtime]);

  //----------------------------------------------------------------------
  // Send message (NO select() so realtime handles it)
  //----------------------------------------------------------------------
  const sendMessage = async () => {
    if (!roomId || !newMessage.trim()) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      user: username,
      content: newMessage,
    });

    setNewMessage("");
  };

  //----------------------------------------------------------------------
  // Sorting (guaranteed stable)
  //----------------------------------------------------------------------
  const sortedMessages = useMemo(() => {
    return [...messages].sort((a, b) =>
      a.created_at.localeCompare(b.created_at)
    );
  }, [messages]);

  //----------------------------------------------------------------------
  // Auto-scroll when messages update
  //----------------------------------------------------------------------
  useEffect(() => {
    scrollToBottom();
  }, [sortedMessages, scrollToBottom]);

  //----------------------------------------------------------------------
  // UI Rendering
  //----------------------------------------------------------------------
  return (
    <div className="flex flex-col h-[70vh] max-w-[90%] mt-20 mx-auto bg-yellow-500 rounded-lg">
      {/* MESSAGES */}
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

      {/* INPUT */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-2 p-4 border-t"
      >
        <Input
          type="text"
          className="rounded-full bg-white"
          placeholder={connected ? "Type..." : "Connecting..."}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!connected}
        />

        <Button type="submit" disabled={!connected || !newMessage.trim()}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
