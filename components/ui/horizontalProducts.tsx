"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./card";
import Image from "next/image";

function HorizontalProductsCard(props: productprops) {
  return (
    <div className="">
      <Card className="p-0">
        <CardContent className="">
          <div className="max-w-full h-auto p-0 h-[40vh]">
            <Image
              src={props.imageurl}
              alt={`${props.imageurl}`}
              width={120}
              height={80}
              className="w-full object-contain"
            />
          </div>
          <CardTitle className="">{props.label}</CardTitle>
          <CardDescription className="">{props.price}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default HorizontalProductsCard;
