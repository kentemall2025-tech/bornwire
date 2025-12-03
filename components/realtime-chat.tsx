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
  user_email?: string;
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
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // ──────────────────────────────────────────────
  // 1. Load authenticated user
  // ──────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setCurrentUser(data.user.id);
        setCurrentUserEmail(data.user.email ?? null);
      }
    });
  }, []);

  // ──────────────────────────────────────────────
  // 2. Ensure room exists
  // ──────────────────────────────────────────────
  const ensureRoom = useCallback(async () => {
    if (!currentUser) return;

    const safeRoomName = roomName?.trim() || "default-room";

    const { data: existing } = await supabase
      .from("rooms")
      .select("id")
      .eq("name", safeRoomName)
      .maybeSingle();

    if (existing) {
      setRoomId(existing.id);
      return;
    }

    const { data: newRoom, error } = await supabase
      .from("rooms")
      .insert({
        name: safeRoomName,
        created_by: currentUser,
      })
      .select()
      .single();

    if (error) {
      console.error("Room creation error:", error);
      return;
    }

    setRoomId(newRoom.id);
  }, [roomName, currentUser]);

  useEffect(() => {
    if (currentUser) ensureRoom();
  }, [ensureRoom, currentUser]);

  // ──────────────────────────────────────────────
  // 3. Load persisted message history (fixed)
  // ──────────────────────────────────────────────
  const loadHistory = useCallback(async (rid: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        id,
        room_id,
        user_id,
        content,
        created_at
      `
      )
      .eq("room_id", rid)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("History load error:", error);
      return;
    }

    // Post-process: fetch user emails for all messages
    // This avoids broken relationships from auth.users
    const enriched = await Promise.all(
      (data ?? []).map(async (msg) => {
        const { data: userInfo } = await supabase.auth.admin.getUserById(
          msg.user_id
        );
        return {
          ...msg,
          user_email: userInfo?.user?.email ?? "Unknown",
        };
      })
    );

    setMessages(enriched as ChatMessage[]);
    setHistoryLoaded(true);
  }, []);

  // ──────────────────────────────────────────────
  // 4. Real-time subscription (fixed payload)
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
        async (payload) => {
          const msg = payload.new as ChatMessage;

          // fetch the correct email
          const { data: userInfo } = await supabase.auth.admin.getUserById(
            msg.user_id
          );

          setMessages((prev) => [
            ...prev,
            {
              ...msg,
              user_email: userInfo?.user?.email ?? "Unknown",
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
  }, [roomId, loadHistory, subscribeRealtime]);

  // ──────────────────────────────────────────────
  // 5. Send message
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
  // 6. Sort messages
  // ──────────────────────────────────────────────
  const sortedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    [messages]
  );

  // Auto-scroll after history loads
  useEffect(() => {
    if (historyLoaded) scrollToBottom();
  }, [sortedMessages, historyLoaded]);

  // ──────────────────────────────────────────────
  // 7. UI
  // ──────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[85vh] w-full mx-auto rounded-2xl bg-yellow-500 border shadow">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white rounded-t-2xl"
      >
        {!historyLoaded ? (
          <p className="text-center text-gray-500">Loading messages…</p>
        ) : (
          sortedMessages.map((msg) => (
            <ChatMessageItem
              key={msg.id}
              message={{
                id: msg.id,
                user: { name: msg.user_email ?? "Unknown" },
                content: msg.content,
                createdAt: msg.created_at,
              }}
              isOwnMessage={msg.user_id === currentUser}
              showHeader={true}
            />
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-3 p-3 bg-gray-100 border-t rounded-b-2xl"
      >
        <Input
          placeholder={connected ? "Type your message…" : "Connecting…"}
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
