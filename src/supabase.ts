import { createClient } from "@supabase/supabase-js"
import { LTL_SUPABASE_API_KEY, LTL_SUPABASE_PROJECT_URL } from "./consts/supabase"

export const supabase = createClient(
  LTL_SUPABASE_PROJECT_URL  || '',
  LTL_SUPABASE_API_KEY || ''
)