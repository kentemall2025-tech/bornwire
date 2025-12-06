"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { ChatMessageItem } from "./chat-message";
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
  user_email?: string | null;
}

interface Props {
  roomId?: string | null; // admin uses this
}

export default function RealtimeChat({ roomId: forcedRoomId }: Props) {
  const ADMIN_EMAIL = "kente.mall2025@gmail.com";

  const { containerRef, scrollToBottom } = useChatScroll();

  const [roomId, setRoomId] = useState<string | null>(forcedRoomId ?? null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string>("");

  const [connected, setConnected] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  /**
   * 1️⃣ Set up realtime JWT
   */
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      if (token) supabase.realtime.setAuth(token);
    })();
  }, []);

  /**
   * 2️⃣ Load current user
   */
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      if (!user) return;

      setCurrentUser(user.id);
      setCurrentEmail(user.email || "");

      // Ensure profile exists
      await supabase
        .from("profiles")
        .upsert({ id: user.id, email: user.email }, { onConflict: "id" });
    })();
  }, []);

  /**
   * 3️⃣ For normal users: create or load their room
   */
  const ensurePrivateRoom = useCallback(async () => {
    if (!currentEmail || !currentUser) return;
    if (currentEmail === ADMIN_EMAIL) return; // admin does NOT auto–create room

    const privateName = `private-${currentEmail}`;

    //  Check if room exists
    const { data: existing } = await supabase
      .from("rooms")
      .select("id")
      .eq("name", privateName)
      .maybeSingle();

    // Already exists
    if (existing?.id) {
      setRoomId(existing.id);
      return;
    }

    // Create new room for this user
    const { data: created } = await supabase
      .from("rooms")
      .insert({
        name: privateName,
        created_by: currentUser,
        owner_email: currentEmail,
      })
      .select()
      .single();

    if (created?.id) setRoomId(created.id);
  }, [currentEmail, currentUser, forcedRoomId]);

  useEffect(() => {
    if (!currentUser || !currentEmail) return;
    ensurePrivateRoom();
  }, [currentUser, currentEmail, ensurePrivateRoom]);

  /**
   * 4️⃣ Load message history
   */
  const loadHistory = useCallback(async (rid: string) => {
    setHistoryLoaded(false);

    const { data, error } = await supabase
      .from("messages")
      .select(
        `
          id,
          room_id,
          user_id,
          content,
          created_at,
          profiles:user_id ( email )
        `
      )
      .eq("room_id", rid)
      .order("created_at");

    if (error) {
      console.log("History error:", error);
      setHistoryLoaded(true);
      return;
    }

    const enriched = data?.map((m: any) => ({
      ...m,
      user_email: m.profiles?.email ?? null,
    }));

    setMessages(enriched || []);
    setHistoryLoaded(true);
  }, []);

  /**
   * 5️⃣ Realtime
   */
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

          const { data: profile } = await supabase
            .from("profiles")
            .select("email")
            .eq("id", msg.user_id)
            .maybeSingle();

          setMessages((prev) => [
            ...prev,
            { ...msg, user_email: profile?.email || null },
          ]);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setConnected(true);
      });

    return channel;
  }, []);

  /**
   * 6️⃣ When room changes → load + subscribe
   */
  useEffect(() => {
    if (!roomId) return;

    loadHistory(roomId);
    const channel = subscribeRealtime(roomId);

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, loadHistory, subscribeRealtime]);

  /**
   * 7️⃣ Send message
   */
  const sendMessage = async () => {
    if (!newMessage.trim() || !roomId || !currentUser) return;

    await supabase.from("messages").insert({
      room_id: roomId,
      user_id: currentUser,
      content: newMessage.trim(),
    });

    setNewMessage("");
  };

  /**
   * 8️⃣ Sorted messages
   */
  const sortedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    [messages]
  );

  useEffect(() => {
    if (historyLoaded) scrollToBottom();
  }, [sortedMessages, historyLoaded, scrollToBottom]);

  /**
   * 9️⃣ UI
   */
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
                user: { email: msg.user_email || "Unknown" },
                content: msg.content,
                createdAt: msg.created_at,
              }}
              isOwnMessage={msg.user_id === currentUser}
              showHeader={true}
            />
          ))
        )}
      </div>

      {/* Input */}
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

        <Button type="submit" disabled={!newMessage.trim()}>
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
