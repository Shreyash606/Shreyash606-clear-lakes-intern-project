import { createClient } from "@supabase/supabase-js";

export const useSupabaseServer = () => {
  const supabaseUrl = process.env.SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_KEY || "";

  return createClient(supabaseUrl, supabaseKey);
};
