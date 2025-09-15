import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xaysalgrgovgumppbjhe.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
