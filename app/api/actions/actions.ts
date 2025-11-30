"use server";

import { supabase } from "@/lib/supabase/supabase";

export const logoutFunc = async () => {
  return await supabase.auth.signOut();
};

export const loginFunc = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const resetFunc = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email);
};

export const updateFunc = async (
  email: string,
  password: string,
  data: any
) => {
  return await supabase.auth.updateUser({
    email,
    password,
    data,
  });
};
