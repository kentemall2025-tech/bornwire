"use client";
import React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface logooutprops {
  className?: string;
}

function Logoutbtn(props: logooutprops) {
  return (
    <div className="">
      <Button className={cn("", props.className)}>logout</Button>
    </div>
  );
}

export default Logoutbtn;
