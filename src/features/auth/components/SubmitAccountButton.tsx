'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../stores/useAuthStore';

export default function SubmitAccountButton() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

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
      onClick={() => router.push(`/${user?.id}`)}
      variant='default'
      size='sm'
      className='bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-400'
    >
      Account
    </Button>
  );
}
