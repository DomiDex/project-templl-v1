import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { CookieOptions } from '@supabase/ssr';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export function createClient() {
  let cookieStore: ReadonlyRequestCookies;

  try {
    cookieStore = cookies();
  } catch (e) {
    console.error('Error accessing cookies:', e);
    throw new Error('Failed to access cookie store');
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          try {
            return cookieStore.get(name)?.value;
          } catch (e) {
            console.error('Error getting cookie:', e);
            return undefined;
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              // Ensure secure cookies in production
              secure: process.env.NODE_ENV === 'production',
            });
          } catch (e) {
            // Handle cookie setting errors
            console.error('Error setting cookie:', e);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value: '',
              ...options,
              maxAge: 0,
              secure: process.env.NODE_ENV === 'production',
            });
          } catch (e) {
            // Handle cookie removal errors
            console.error('Error removing cookie:', e);
          }
        },
      },
    }
  );
}
