import { create } from "zustand";
import { supabase } from "./supabase/supabase";

interface CountStore {
  email: string;
  setEmail: (value: string) => void;
}

const useCountStore = create<CountStore>((set) => ({
  email: "",
  setEmail: (value) => set(() => ({ email: value })),
  user: "",
}));

export default useCountStore;
