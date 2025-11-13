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

const ProductForm = () => {
  return (
    <div className="p-4 ">
      <FieldSet className=" bg-slate-200 rounded-lg shadow-lg">
        <FieldLegend className="text-2xl font-bold ">
          {" "}
          Create a New Product
        </FieldLegend>
        <FieldGroup className="rounded-lg shadow-xl p-2 ">
          <Field>
            <FieldLabel>Name </FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              name of products must be only use alphabets.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>price </FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              this is the price of the product.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>description </FieldLabel>
            <Textarea className="bg-white" />
            <FieldDescription>
              description must be less than 300 words.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Image </FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              please your image must be hosted on vercel blobs.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>inventory</FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              how many of the product are in inventory now.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>details image</FieldLabel>
            <Input className="bg-white" />
            <FieldDescription>
              thumbnail image for the product.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default ProductForm;
