import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function submitToWaitlist(data: Database['public']['Tables']['waitlist_submissions']['Insert']) {
  const { error } = await supabase
    .from('waitlist_submissions')
    .insert([data]);

  if (error) throw error;
  return { success: true };
} 