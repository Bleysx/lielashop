import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uplwdpbwmwtrxlyempjq.supabase.co";

const supabaseKey = "sb_publishable_bCknDGr0PztAXqjbY5V3bw_H36P5xw8";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.sessionStorage
    }
  }
);