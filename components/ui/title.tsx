"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface titleprops {
  message: string;
  className?: string;
}

function TitleTag({ message, className }: titleprops) {
  return (
    <div className="">
      <h2 className={cn("", className)}>{message}</h2>
    </div>
  );
}

export default TitleTag;
