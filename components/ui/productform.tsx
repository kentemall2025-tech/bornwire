"use client";
import React from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./field";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { supabase } from "@/lib/supabase/supabase";

const ProductForm = () => {
  return (
    <div className="p-2 ">
      <FieldSet className=" bg-yellow-500 rounded-lg shadow-lg ">
        <FieldGroup className="rounded-lg shadow-xl p-4 flex flex-col gap-4">
          <FieldLegend className="text-4xl p-2 uppercase   font-bold  ">
            Create or Edit a New Product
          </FieldLegend>
          <Field>
            <FieldLabel className="text-lg capitalize">Name </FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              name of products must be only use alphabets.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel className="text-lg capitalize">price </FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              this is the price of the product.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel className="text-lg capitalize">description </FieldLabel>
            <Textarea className="bg-white" />
            <FieldDescription>
              description must be less than 300 words.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel className="text-lg capitalize">Image </FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              please your image must be hosted on vercel blobs.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel className="text-lg capitalize">inventory</FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              how many of the product are in inventory now.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel className="text-lg capitalize">
              details image
            </FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              thumbnail image for the product.
            </FieldDescription>
          </Field>
          <Button className="text-lg bg-orange-500 shadow-xl p-6 uppercase font-bold tracking-wider">
            submit
          </Button>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default ProductForm;
