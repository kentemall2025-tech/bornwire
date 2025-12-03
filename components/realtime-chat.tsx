"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { ChatMessageItem } from "@/components/chat-message";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  provider: string;
  email: string;
  avatar_url: string;
}

interface ChatMessage {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: Profile;
}

interface Props {
  roomName: string;
  username: string;
}

export default function RealtimeChat({ roomName }: Props) {
  const { containerRef, scrollToBottom } = useChatScroll();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);

  // ──────────────────────────────────────────────
  // Load auth user STEP-0ONE
  // ──────────────────────────────────────────────
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setCurrentUser(data.user.id);
    };
    loadUser();
    console.log("step 1");
  }, []);

  // ──────────────────────────────────────────────
  // Load all profiles STEP- TWO
  // ──────────────────────────────────────────────
  const loadProfiles = useCallback(async () => {
    const { data } = await supabase.from("profiles").select("*");
    if (data) setProfiles(data);
  }, []);

  useEffect(() => {
    loadProfiles();
    console.log("two");
  }, [loadProfiles]);

  // ──────────────────────────────────────────────
  // Create or get room STEP- THREE
  // ──────────────────────────────────────────────
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

  useEffect(() => {
    ensureRoom();
    console.log("three");
  }, [ensureRoom]);

  // ──────────────────────────────────────────────
  // Load old message history with joined profiles
  // ──────────────────────────────────────────────
  const loadHistory = useCallback(
    async (rid: string) => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("created_by", rid)
        .order("created_at");

      if (!data) return;

      const joined = data.map((m) => ({
        ...m,
        user: profiles.find((p) => p.id === m.user_id) || {
          id: m.user_id,

          full_name: "Unknown",
        },
      }));
      console.log("four");
      setMessages(joined);
    },
    [profiles]
  );

  // ──────────────────────────────────────────────
  // Subscribe to realtime
  // ──────────────────────────────────────────────

  const subscribeRealtime = useCallback(
    (rid: string) => {
      const channel = supabase.channel(`room-${rid}`);

      channel.on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },

        (payload) => {
          const msg = payload.new as ChatMessage;

          const profile = profiles.find((p) => p.id === msg.user_id) || {
            id: msg.user_id,

            full_name: "Unknown",
          };

          setMessages((prev: any) => [...prev, { ...msg, user: profile }]);
        }
      );

      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") setConnected(true);
      });

      console.log("five");
      return channel;
    },
    [profiles]
  );

  // Subscribe when room + profiles are ready
  useEffect(() => {
    if (!roomId || profiles.length === 0) return;

    loadHistory(roomId);
    const channel = subscribeRealtime(roomId);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, profiles, loadHistory, subscribeRealtime]);

  // ──────────────────────────────────────────────
  // Send message
  // ──────────────────────────────────────────────

  const sendMessage = async () => {
    if (!roomId || !currentUser || !newMessage.trim()) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      user: currentUser,
      content: newMessage,
    });
    console.log("step- six");
    setNewMessage("");
  };

  // ──────────────────────────────────────────────
  // Sorting
  // ──────────────────────────────────────────────

  const sortedMessages = useMemo(
    () =>
      [...messages].sort((a, b) => a.created_at.localeCompare(b.created_at)),

    [messages]
  );

  useEffect(() => {
    scrollToBottom();
    console.log("step-seven");
  }, [sortedMessages]);

  // ──────────────────────────────────────────────
  // UI
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
              user: { name: msg.user.full_name },
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
