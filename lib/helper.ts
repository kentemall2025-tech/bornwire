import { supabase } from "./supabase/supabase";

export async function createProduct(formData: FormData) {
  const product = await supabase
    .from("product")
    .insert({
      formData,
    })
    .select()
    .single();
}

export async function updateProduct(formData: FormData) {}

export async function deleteProduct(formData: FormData) {
  const product = await supabase.from("product").update(FormData);
}
