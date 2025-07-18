
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rmwooosiylpipaozxkom.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtd29vb3NpeWxwaXBhb3p4a29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NzM3ODcsImV4cCI6MjA2MjI0OTc4N30.kFQXHRdtYnSKuZ_cOzpQjgN2uf2J-wJm73D8UwAaHxM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
