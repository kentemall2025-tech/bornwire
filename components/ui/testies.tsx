import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./card";
import { cn } from "@/lib/utils";

interface testimonialcards {
  id: string;
  name: string;
  message: string;
  email: string;
}

interface testimonialsprops {
  testies: testimonialcards[];
  className?: string;
}

function Testimonials(props: testimonialsprops) {
  return (
    <div className={cn("", props.className)}>
      {props.testies.map((item, index) => {
        return (
          <Card className="" key={item.id}>
            <CardContent className="space-y-4">
              <CardTitle className="font-bold text-2xl">{item.name}</CardTitle>
              <CardContent>{item.message}</CardContent>
              <CardFooter className="text-sm font-medium">
                {item.email}
              </CardFooter>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default Testimonials;
