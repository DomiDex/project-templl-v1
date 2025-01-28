'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LoginLogout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  };

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className='flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors px-2'
      >
        <p>Logout</p>
      </button>
    );
  }

  return (
    <Link
      href='/sign-in'
      className='flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors px-2'
    >
      <p>Login</p>
    </Link>
  );
}
