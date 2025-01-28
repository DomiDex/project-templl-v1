// This check can be removed
// it is just for tutorial purposes

import { createBrowserClient } from '@supabase/ssr';

export function checkEnvVars() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    throw new Error('Missing required environment variables');
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
    throw new Error('Missing required environment variables');
  }

  // Test client creation
  try {
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    throw new Error('Invalid Supabase configuration');
  }

  return {
    hasEnvVars: true,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}
