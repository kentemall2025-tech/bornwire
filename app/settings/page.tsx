import Logoutbtn from "@/components/ui/logoutbtn";
import TitleTag from "@/components/ui/title";
import React from "react";

export default function page() {
  return (
    <div className="p-4  flex flex-col justify-between  gap-8  h-screen ">
      <div>
        <TitleTag
          message="Public Profile Settings "
          className="font-bold text-2xl  "
        />
      </div>
      <div>
        <TitleTag message="Account Details" className="font-bold text-2xl  " />
      </div>
      <TitleTag message="Legal " className="font-bold text-2xl  " />
      <div className="bottom-10">
        <Logoutbtn className="w-full  uppercase bg-yellow-500 text-white font-bold tracking-wider hover:-translate-y-0.5 duration-400 ease-out" />
      </div>
    </div>
  );
}
