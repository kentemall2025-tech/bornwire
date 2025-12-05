"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface roomprops {
  id: string;
  created_at: string;
  name: string;
  created_by: string;
}

export default function MessageCard(props: roomprops) {
  return (
    <div>
      <Card>
        <CardContent>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>{props.created_by}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
