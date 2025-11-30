"use client";
import React, { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./field";
import { Input } from "./input";
import { Button } from "./button";
import { supabase } from "@/lib/supabase/supabase";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    label: "",
    imageurl: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Add basic validation
    if (!formData.label || !formData.price || !formData.imageurl) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("product").insert([
      {
        price: formData.price,
        imageurl: formData.imageurl,
        label: formData.label,
      },
    ]);

    console.log("number 200 ", data);

    setSuccess(true);
    setFormData({
      label: "",
      price: "",
      imageurl: "",
    });
    setLoading(false);
  };

  return (
    <div className="p-4 bg-yellow-500 w-full h-screen">
      <FieldSet className=" bg-white  mt-20 h-[60vh]">
        <FieldGroup className="rounded-lg  shadow-xl p-4 flex flex-col gap-8">
          <FieldLegend className="text-4xl p-2 uppercase font-bold">
            Edit a New Product
          </FieldLegend>
          <form onSubmit={handleSubmit}>
            <Field>
              <FieldLabel htmlFor="label" className="text-lg capitalize">
                label
              </FieldLabel>
              <Input
                id="label"
                name="label"
                className="bg-white"
                value={formData.label}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="price" className="text-lg capitalize">
                Price
              </FieldLabel>
              <Input
                id="price"
                name="price"
                className="bg-white"
                value={formData.price}
                onChange={handleChange}
                type="number"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="imageurl" className="text-lg capitalize">
                Image Url
              </FieldLabel>
              <Input
                id="imageurl"
                name="imageurl"
                className="bg-white"
                value={formData.imageurl}
                onChange={handleChange}
              />
            </Field>
            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <p className="text-green-500">Product created successfully!</p>
            )}

            <Button
              type="submit"
              className="text-lg bg-orange-500 shadow-xl p-6 w-full mt-8  uppercase font-bold tracking-wider"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </FieldGroup>
      </FieldSet>
    </div>
  );
};

export default ProductForm;
