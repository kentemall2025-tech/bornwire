import { footerlinkContent } from "@/lib/constants";
import Link from "next/link";
import React from "react";

function FooterLinks() {
  return (
    <div className="max-w-full  h-40">
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {footerlinkContent.map((item, index) => {
          return (
            <div className="cursor-pointer  " key={item.id}>
              <Link
                href={item.href}
                className="text-black  text-sm   text-yellow-500 font-bold  cursor-pointer  capitalize "
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FooterLinks;
