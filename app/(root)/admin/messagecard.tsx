"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface roomprops {
  id: string;
  created_at: string;
  name: string; // this will be user email
  created_by: string;
}

export default function MessageCard(props: roomprops) {
  return (
    <Link href={`/chat/${props.id}?roomName=${props.id}`}>
      <Card className="p-4 cursor-pointer hover:bg-accent transition">
        <CardTitle>{props.name}</CardTitle>
        <CardDescription>{props.created_by}</CardDescription>
      </Card>
    </Link>
  );
}
