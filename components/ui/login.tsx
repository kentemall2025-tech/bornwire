"use client";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const LoginBtn = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/signin")}
      className="text-lg cursor-pointer  hover:bg-yellow-500 font-bold bg-yellow-500 text-white text-sm uppercase font-bold"
    >
      log in
    </Button>
  );
};

export default LoginBtn;
