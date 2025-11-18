"use client";
import { cn } from "@/lib/utils";
import React from "react";
import ServiceCard from "./servicecard";

interface serviceidprops {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  message: string;
}

interface serviceprops {
  services: serviceidprops[];
  className?: string;
}

function Services(props: serviceprops) {
  return (
    <div
      className={cn(
        "max-w-full flex bg-yellow-500 p-2 flex-col gap-6 ",
        props.className
      )}
    >
      {props.services.map((item, index) => {
        return <ServiceCard key={index} {...item} />;
      })}
    </div>
  );
}

export default Services;
