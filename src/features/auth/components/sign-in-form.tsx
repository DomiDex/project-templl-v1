'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from '../actions/sign-in';
import { AuthError } from './auth-error';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons/google';
import Link from 'next/link';

export function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const result = await signIn(data);

      if ('error' in result) {
        setError(result.error);
      } else if ('success' in result) {
        router.replace(result.redirectTo);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {error && <AuthError message={error} />}
      <Input
        type='email'
        name='email'
        placeholder='Email'
        required
        disabled={loading}
      />
      <div className='space-y-2'>
        <Input
          type='password'
          name='password'
          placeholder='Password'
          required
          disabled={loading}
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
        fullWidth
        size='lg'
        type='submit'
        disabled={loading}
        className='bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white transition-colors'
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
