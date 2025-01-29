import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    const response = NextResponse.next({
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
            const cookiesObj: { [key: string]: string } = {};
            request.cookies.getAll().forEach((cookie) => {
              cookiesObj[cookie.name] = cookie.value;
            });
            return Object.entries(cookiesObj).map(([name, value]) => ({
              name,
              value,
            }));
          },
          setAll(cookies) {
            cookies.forEach(({ name, value, ...options }) => {
              response.cookies.set({
                name,
                value,
                ...options,
              });
            });
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Block access to /protected/* routes for non-authenticated users
    if (request.nextUrl.pathname.startsWith('/account/')) {
      if (!user) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }

      const urlPath = request.nextUrl.pathname;
      const requestedId = urlPath.split('/account/')[1].split('/')[0];

      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_username')
        .eq('id', user.id)
        .single();

      if (
        requestedId !== profile?.profile_username &&
        requestedId !== user.id
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Block direct access to dynamic routes outside of /protected
    if (request.nextUrl.pathname.match(/^\/[^/]+$/)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Handle root path redirect for authenticated users
    if (request.nextUrl.pathname === '/' && user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_username')
        .eq('id', user.id)
        .single();

      return NextResponse.redirect(
        new URL(`/account/${profile?.profile_username || user.id}`, request.url)
      );
    }

    return response;
  } catch (e) {
    console.error('Middleware error:', e);
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
};
