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
    <div>
      <Card className="m-4">
        <CardContent className="">
          <div className="flex space-y-5 items-start gap-4">
            <props.icon className="bg-yellow-500  p-1 text-2xl rounded-sm" />
            <CardTitle className="text-2xl font-bold ">{props.title}</CardTitle>
          </div>
          <CardDescription className="font-medium text-lg">
            {props.message}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default ServiceCard;
