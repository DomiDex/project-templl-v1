'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../stores/useAuthStore';

export default function LoginLogout() {
  const router = useRouter();
  const { isAuthenticated, signOut } = useAuthStore();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  return (
    <Button
      onClick={isAuthenticated ? handleSignOut : handleSignIn}
      variant='ghost'
      size='sm'
      className='text-purple-700 hover:text-purple-800 dark:text-purple-300 dark:hover:text-purple-200'
    >
      {isAuthenticated ? 'Sign Out' : 'Sign In'}
    </Button>
  );
}
