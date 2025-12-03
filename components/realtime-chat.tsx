"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { ChatMessageItem } from "@/components/chat-message";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: { email?: string };
}

interface Props {
  roomName: string;
}

export default function RealtimeChat({ roomName }: Props) {
  const { containerRef, scrollToBottom } = useChatScroll();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);

  // ──────────────────────────────────────────────
  // 1. Load Supabase authenticated user
  // ──────────────────────────────────────────────
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setCurrentUser(data.user.id);
        setCurrentUserEmail(data.user.email ?? null);
      }
    };
    loadUser();
  }, []);

  // ──────────────────────────────────────────────
  // 2. Ensure room exists but DO NOT duplicate rooms
  // ──────────────────────────────────────────────
  const ensureRoom = useCallback(async () => {
    if (!currentUser) return;

    const { data: existing } = await supabase
      .from("rooms")
      .select("id")
      .eq("name", roomName)
      .maybeSingle();

    if (existing) {
      setRoomId(existing.id);
      return;
    }

    // Create once
    const { data: newRoom } = await supabase
      .from("rooms")
      .insert({
        name: roomName,
        created_by: currentUser,
      })
      .select()
      .single();

    if (newRoom) setRoomId(newRoom.id);
  }, [roomName, currentUser]);

  useEffect(() => {
    if (currentUser) ensureRoom();
  }, [ensureRoom, currentUser]);

  // ──────────────────────────────────────────────
  // 3. Load message history (one-time)
  // ──────────────────────────────────────────────
  const loadHistory = useCallback(async (rid: string) => {
    const { data } = await supabase
      .from("messages")
      .select(
        `
        id,
        room_id,
        user_id,
        content,
        created_at,
        user:user_id ( email )
      `
      )
      .eq("room_id", rid)
      .order("created_at", { ascending: true });

    if (data) setMessages(data as any);
  }, []);

  // ──────────────────────────────────────────────
  // 4. Realtime insert listener (SUPER FAST — no DB re-fetch)
  // ──────────────────────────────────────────────
  const subscribeRealtime = useCallback((rid: string) => {
    const channel = supabase
      .channel(`room-${rid}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${rid}`,
        },
        (payload) => {
          // Use payload directly — no extra query!
          setMessages((prev: any) => [
            ...prev,
            {
              ...payload.new,
              user: { email: payload.new.user_email ?? "Unknown" },
            },
          ]);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setConnected(true);
      });

    return channel;
  }, []);

  useEffect(() => {
    if (!roomId) return;

    loadHistory(roomId);
    const channel = subscribeRealtime(roomId);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, subscribeRealtime, loadHistory]);

  // ──────────────────────────────────────────────
  // 5. Send a message
  // ──────────────────────────────────────────────
  const sendMessage = async () => {
    if (!roomId || !currentUser || !newMessage.trim()) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      user_id: currentUser,
      content: newMessage,
    });

    setNewMessage("");
  };

  // ──────────────────────────────────────────────
  // 6. Sorted messages
  // ──────────────────────────────────────────────
  const sortedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    [messages]
  );

  useEffect(() => {
    scrollToBottom();
  }, [sortedMessages]);

  // ──────────────────────────────────────────────
  // 7. UI Rendering
  // ──────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[85vh] w-full mx-auto rounded-2xl bg-yellow-500 border shadow">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-t-2xl"
      >
        {sortedMessages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            message={{
              id: msg.id,
              user: { name: msg.user?.email || "Unknown" },
              content: msg.content,
              createdAt: msg.created_at,
            }}
            isOwnMessage={msg.user_id === currentUser}
            showHeader={true}
          />
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-3 p-3 bg-gray-100 border-t rounded-b-2xl"
      >
        <Input
          placeholder={connected ? "Type your message..." : "Connecting..."}
          value={newMessage}
          disabled={!connected}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 rounded-full bg-white shadow-sm px-4 py-2"
        />

        <Button
          type="submit"
          disabled={!connected || !newMessage.trim()}
          className="rounded-full px-4 py-2"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
