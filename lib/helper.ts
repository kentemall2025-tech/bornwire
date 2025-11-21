import { supabase } from "./supabase";

export async function createProduct(formData: FormData) {
  const product = await supabase.from("product").insert({
    formData,
  });
}

export async function updateProduct(formData: FormData) {
  const product = await supabase.from("product").update(FormData);
}

export async function deleteProduct(formData: FormData) {
  const product = await supabase.from("product").update(FormData);
}
