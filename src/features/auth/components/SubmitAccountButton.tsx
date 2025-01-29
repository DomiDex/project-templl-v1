'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../stores/useAuthStore';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function SubmitAccountButton() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [username, setUsername] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_username')
          .eq('id', user.id)
          .single();

        setUsername(profile?.profile_username || null);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated, user?.id, supabase]);

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => router.push('/sign-up')}
        variant='default'
        size='sm'
        className='bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-400'
      >
        Submit Here
      </Button>
    );
  }

  return (
    <Button
      onClick={() => router.push(`/account/${username || user?.id}`)}
      variant='default'
      size='sm'
      className='bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-400'
    >
      Account
    </Button>
  );
}
