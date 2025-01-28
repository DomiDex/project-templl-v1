import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types';
import { checkEnvVars } from './check-env-vars';

export const createClient = () => {
  const { supabaseUrl, supabaseKey } = checkEnvVars();

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
};
