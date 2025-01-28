'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons/google';
import Link from 'next/link';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, setLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = {
        id: '1',
        email,
        name: 'User Name',
      };

      signIn(user);
      // Redirect to the user's profile page
      router.push(`/${user.id}`);
    } catch (error) {
      console.error('Sign in failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='dark:bg-darkGray dark:border-gray-700'
        />
        <div className='space-y-2'>
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='dark:bg-darkGray dark:border-gray-700'
          />
          <div className='flex justify-end'>
            <Link
              href='/forgot-password'
              className='text-sm text-purple-500 hover:text-purple-600 dark:text-purple-200 dark:hover:text-purple-100 transition-colors'
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <Button
          type='submit'
          fullWidth
          size='lg'
          className='bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white transition-colors'
        >
          Sign In
        </Button>
      </form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-300 dark:border-gray-600' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-purple-800'>
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type='button'
        variant='outline'
        fullWidth
        size='lg'
        className='flex items-center justify-center gap-2 border-[1px] border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-purple-700 transition-colors'
      >
        <GoogleIcon className='w-5 h-5' />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
}
