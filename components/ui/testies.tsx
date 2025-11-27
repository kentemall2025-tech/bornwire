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
    <div className={cn("flex flex-col items-center  gap-10 ", props.className)}>
      {props.testies.map((item, index) => {
        return (
          <Card
            className="shadow-lg max-w-lg my-5 shadow-yellow-400  w-full "
            key={item.id}
          >
            <CardContent className="space-y-4 flex flex-col  items-center ">
              <CardTitle className="font-extrabold text-2xl tracking-wider text-center text-yellow-500">
                {item.name}
              </CardTitle>
              <CardContent className="text-lg  text-lg">
                {item.message}
              </CardContent>
              <CardFooter className="text-lg font-medium text-muted-foreground text-center ">
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
