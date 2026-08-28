import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.SUPABASE_URL;
const supabase_api_key = process.env.SUPABASE_API_KEY;

export const supabase = createClient(supabase_url, supabase_api_key);
