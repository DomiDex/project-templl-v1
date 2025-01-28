// This check can be removed
// it is just for tutorial purposes

import { createBrowserClient } from '@supabase/ssr';

export function checkEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('Environment check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    nodeEnv: process.env.NODE_ENV,
  });

  if (!supabaseUrl || !supabaseKey) {
    console.error('Environment variables missing:', {
      NEXT_PUBLIC_SUPABASE_URL: !!supabaseUrl,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!supabaseKey,
    });
    throw new Error(
      `Missing environment variables. URL: ${!!supabaseUrl}, Key: ${!!supabaseKey}`
    );
  }

  try {
    const client = createBrowserClient(supabaseUrl, supabaseKey);
    if (!client) throw new Error('Failed to create client');
  } catch (error) {
    console.error('Supabase client creation failed:', error);
    throw error;
  }

  return {
    hasEnvVars: true,
    supabaseUrl,
    supabaseKey,
  };
}
