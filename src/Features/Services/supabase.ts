import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://sucxyailepgfcwgpovsh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1Y3h5YWlsZXBnZmN3Z3BvdnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxNDU4MjYsImV4cCI6MjAzODcyMTgyNn0.GtotPeEszhOtIIxjztuZfiGnw1LwiWlt2WXARfQ5uMI";
export const supabase = createClient(supabaseUrl, supabaseKey);
