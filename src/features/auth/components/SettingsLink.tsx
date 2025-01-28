'use client';

import { createClient } from '@/utils/supabase/client';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SettingsLink() {
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Link
      href='/'
      className='flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors'
    >
      <Settings className='w-5 h-5' />
      <p className='text-sm'>settings</p>
    </Link>
  );
}
