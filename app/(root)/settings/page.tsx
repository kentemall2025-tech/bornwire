"use client";
import { Card, CardContent } from "@/components/ui/card";
import LogoutBtn from "@/components/ui/logoutbtn";
import { supabase } from "@/lib/supabase/supabase";
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
              name
            </div>
            <div className="text-black">{user?.full_name}</div>
          </div>
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

          <div className="w-full">
            <LogoutBtn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
