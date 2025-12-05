"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

interface roomprops {
  id: string;
  created_at: string;
  name: string; // this will be user email
  created_by: string;
}
export default function MessageCard(props: roomprops) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    };
    getUser();
  });
  return (
    <Link
      href={`/chat/${user?.id}?roomName=${user?.id}&username=${user?.email}`}
    >
      <Card className="cursor-pointer hover:bg-accent transition">
        <CardContent className="p-4">
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>{props.created_by}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
