"use client";

import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const LoginBtn = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/login")}
      className="text-lg font-bold bg-yellow-500 text-white text-sm uppercase font-bold"
    >
      log in
    </Button>
  );
};

export default LoginBtn;
