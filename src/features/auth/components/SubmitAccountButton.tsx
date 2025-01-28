'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function SubmitAccountButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileUsername, setProfileUsername] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);

      if (session?.user) {
        setUserId(session.user.id);

        // Fetch profile username
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_username')
          .eq('id', session.user.id)
          .single();

        setProfileUsername(profile?.profile_username || null);
      } else {
        setUserId(null);
        setProfileUsername(null);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session);

      if (session?.user) {
        setUserId(session.user.id);

        // Fetch profile username
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_username')
          .eq('id', session.user.id)
          .single();

        setProfileUsername(profile?.profile_username || null);
      } else {
        setUserId(null);
        setProfileUsername(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <Link
      href={isAuthenticated ? `/${profileUsername || userId}` : '/sign-up'}
      className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white text-gray-50 transition-colors duration-300 px-4 py-2 rounded-md'
    >
      <p>{isAuthenticated ? 'My Account' : 'Submit Here'}</p>
    </Link>
  );
}
