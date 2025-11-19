"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./card";

interface servicecardprops {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  message: string;
}

function ServiceCard(props: servicecardprops) {
  return (
    <div className="">
      <Card className="m-4 p-0">
        <CardContent className="shadow-lg p-6">
          <div className="flex space-y-5 items-start gap-4">
            <props.icon className="text-yellow-500   text-[2xl] rounded-sm" />
            <CardTitle className="text-xl font-bold uppercase font-poppins text-center ">
              {props.title}
            </CardTitle>
          </div>
          <CardDescription className="font-medium text-lg text-pretty  font-poppins">
            {props.message}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default ServiceCard;
