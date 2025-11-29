"use client";
import React, { useState } from "react";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./field";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { supabase } from "@/lib/supabase/supabase";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    label: "",
    imageurl: "",
    description: "",
    price: "",
    bonus_price: "",
    bonus_percentage: "",
    thumbnail: "",
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
    if (
      !formData.label ||
      !formData.price ||
      !formData.description ||
      !formData.thumbnail ||
      !formData.bonus_percentage ||
      !formData
    ) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.from("products").insert([
        {
          label: formData.label,
          price: parseFloat(formData.price),
          description: formData.description,
          image: formData.imageurl,
          bonus_percentage: parseInt(formData.bonus_percentage),
          bonus_price: formData.bonus_price,
        },
      ]);
      console.log(data);
      if (error) {
        throw error;
      }

      setSuccess(true);
      setFormData({
        label: "",
        price: "",
        description: "",
        imageurl: "",
        bonus_percentage: "",
        bonus_price: "",
        thumbnail: "",
      });
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <FieldSet className="bg-yellow-500 rounded-lg shadow-lg">
        <FieldGroup className="rounded-lg shadow-xl p-4 flex flex-col gap-4">
          <FieldLegend className="text-4xl p-2 uppercase font-bold">
            Create or Edit a New Product
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
                step="0.01"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description" className="text-lg capitalize">
                Description
              </FieldLabel>
              <Textarea
                id="description"
                name="description"
                className="bg-white"
                value={formData.description}
                onChange={handleChange}
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
            <Field>
              <FieldLabel
                htmlFor="bonus_percentage"
                className="text-lg capitalize"
              >
                Bonus Percentage
              </FieldLabel>
              <Input
                id="bonus_percentage"
                name="bonus_percentage"
                className="bg-white"
                value={formData.bonus_percentage}
                onChange={handleChange}
                type="number"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="thumbnail" className="text-lg capitalize">
                Thumbnail
              </FieldLabel>
              <Input
                id="thumbnail"
                name="thumbnail"
                className="bg-white"
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </Field>

            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <p className="text-green-500">Product created successfully!</p>
            )}

            <Button
              type="submit"
              className="text-lg bg-orange-500 shadow-xl p-6 w-full mt-2  uppercase font-bold tracking-wider"
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
