'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signUp } from '../actions/sign-up';
import { AuthError } from './auth-error';
import { useRouter } from 'next/navigation';

export function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    try {
      const result = await signUp(data);

      if ('error' in result) {
        if (result.error.includes('email')) {
          setFieldErrors((prev) => ({ ...prev, email: result.error }));
        } else if (result.error.includes('password')) {
          setFieldErrors((prev) => ({ ...prev, password: result.error }));
        } else {
          setError(result.error);
        }
      } else if ('success' in result) {
        router.replace('/verify-email');
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
        type='text'
        name='username'
        placeholder='Username'
        required
        disabled={loading}
        error={!!fieldErrors.username}
        helperText={fieldErrors.username}
      />
      <Input
        type='email'
        name='email'
        placeholder='Email'
        required
        disabled={loading}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
      />
      <Input
        type='password'
        name='password'
        placeholder='Password'
        required
        disabled={loading}
        error={!!fieldErrors.password}
        helperText={fieldErrors.password}
      />
      <Input
        type='password'
        name='confirmPassword'
        placeholder='Confirm Password'
        required
        disabled={loading}
        error={!!fieldErrors.confirmPassword}
        helperText={fieldErrors.confirmPassword}
      />
      <Button
        fullWidth
        size='lg'
        type='submit'
        disabled={loading}
        className='bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white transition-colors'
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}
