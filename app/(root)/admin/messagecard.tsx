"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface roomprops {
  id: string;
  created_at: string;
  name: string; // this will be user email
  created_by: string;
}
export default function MessageCard(props: roomprops) {
  return (
    <Link href={`/chat/${props.id}?roomId=${props.id}`}>
      <Card className="cursor-pointer hover:bg-accent transition">
        <CardContent className="p-4">
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>{props.created_by}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
