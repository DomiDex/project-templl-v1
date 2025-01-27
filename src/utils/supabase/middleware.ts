import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If trying to access a protected route
    if (request.nextUrl.pathname.startsWith('/protected/')) {
      if (!user) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }

      // Extract the username/id from the URL
      const urlPath = request.nextUrl.pathname;
      const requestedId = urlPath.split('/protected/')[1];

      // Get the user's profile to check username
      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_username')
        .eq('id', user.id)
        .single();

      // Check if the requested path matches the user's profile
      if (
        requestedId !== profile?.profile_username &&
        requestedId !== user.id
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    if (request.nextUrl.pathname === '/' && user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_username')
        .eq('id', user.id)
        .single();

      return NextResponse.redirect(
        new URL(
          `/protected/${profile?.profile_username || user.id}`,
          request.url
        )
      );
    }

    return response;
  } catch (e) {
    console.error('Middleware error:', e);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
};
