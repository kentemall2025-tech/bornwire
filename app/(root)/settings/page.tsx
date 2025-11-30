"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import LogoutBtn from "@/components/ui/logoutbtn";

export default function page() {
  return (
    <div className="p-4 flex w-full mt-10 ">
      <Card className="w-full shadow-lg">
        <CardContent className="w-full flex flex-col gap-8 items-center ">
          <div className="w-full flex items-center gap-4 ">
            <div className="text-2xl tracking-wider capitalize tracking-wide">
              name
            </div>
            <div></div>
          </div>
          <div className="w-full flex items-center gap-4 ">
            <div className="text-2xl tracking-wider capitalize tracking-wide">
              email
            </div>

            <div></div>
          </div>
          <div className="w-full flex items-center gap-4 ">
            <div className="text-2xl tracking-wider capitalize tracking-wide">
              joined
            </div>
            <div></div>
          </div>

          <div className="w-full">
            <LogoutBtn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
