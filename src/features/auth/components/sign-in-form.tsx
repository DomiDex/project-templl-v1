'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'next/navigation';
import { GoogleIcon } from '@/components/icons/google';
import Link from 'next/link';
import { signIn } from '../actions/sign-in';
import { AuthError } from './auth-error';

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn: setAuthUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn({ email, password });
      if ('error' in result) {
        setError(result.error ?? 'An error occurred');
        return;
      }

      if (result.success && result.redirectTo) {
        // Set the authenticated user in the store
        setAuthUser({
          id: result.user.id,
          email: result.user.email!,
          name: result.user.user_metadata?.username,
        });

        // Redirect to the profile page
        router.push(result.redirectTo);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && <AuthError message={error} />}
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className='dark:bg-darkGray dark:border-gray-700'
        />
        <div className='space-y-2'>
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
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
          disabled={loading}
          className='bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white transition-colors'
        >
          {loading ? 'Signing in...' : 'Sign In'}
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
        disabled={loading}
        className='flex items-center justify-center gap-2 border-[1px] border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-purple-700 transition-colors'
      >
        <GoogleIcon className='w-5 h-5' />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
}
