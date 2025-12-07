"use client";
import { Card, CardContent } from "@/components/ui/card";
import LogoutBtn from "@/components/ui/logoutbtn";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [user, setUser] = useState<any>(null);

  const handlegetusers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser((prev: any) => user);
  };

  useEffect(() => {
    handlegetusers();
  }, [user]);

  return (
    <div className="p-4 flex w-full mt-10 ">
      <Card className="w-full shadow-lg">
        <CardContent className="w-full flex flex-col gap-8 items-center ">
          <div className="w-full flex items-center gap-4 ">
            <div className="text-2xl tracking-wider capitalize tracking-wide">
              email
            </div>

            <div> {user?.email}</div>
          </div>
          <div className="w-full flex items-center gap-4 ">
            <div className="text-2xl tracking-wider capitalize tracking-wide">
              joined
            </div>
            <div>{user?.created_at}</div>
          </div>
          <div className="flex gap-4 items-center ">
            <div className="w-full">
              <LogoutBtn />
            </div>
            <div>
              {user?.email === "kente.mall2025@gmail.com" && (
                <Link
                  href={"/admin"}
                  className="uppercase p-2 bg-white text-yellow-500 font-bold ring-1 ring-yellow-500 rounded-lg"
                >
                  admin
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
