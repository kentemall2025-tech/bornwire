import { footerlinkContent } from "@/lib/constants";
import Link from "next/link";
import React from "react";

function FooterLinks() {
  return (
    <div className="max-w-full h-40">
      <div className="flex flex-wrap gap-4">
        {footerlinkContent.map((item, index) => {
          return (
            <div className="" key={item.id}>
              <Link
                href={item.href}
                className="text-black z-20 text-lg capitalize "
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
