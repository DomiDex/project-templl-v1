import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 48 48' {...props}>
      <path
        fill='#FFC107'
        d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z'
      />
      <path
        fill='#FF3D00'
        d='m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z'
      />
      <path
        fill='#4CAF50'
        d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z'
      />
      <path
        fill='#1976D2'
        d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z'
      />
    </svg>
  );
}

export default function Page() {
  return (
    <main>
      <Section fullHeight noPadding>
        <Container
          flex
          direction='row'
          items='center'
          justify='between'
          className='h-screen'
          size='full'
          noPadding
        >
          <div className='hidden md:flex md:w-2/3 flex-col items-center justify-center'>
            <div className='relative w-96 h-96'>
              <Image
                src='/images/cool-text.webp'
                alt='Cool Text'
                width={384}
                height={384}
                priority
                className='object-contain'
              />
            </div>
          </div>
          <div className='w-full h-screen md:w-1/3 bg-gray-50 dark:bg-purple-800 flex flex-col items-center justify-center'>
            <div className='w-full max-w-sm px-8'>
              <h1 className='text-2xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50'>
                Sign In
              </h1>
              <form className='space-y-4'>
                <Input type='email' placeholder='Email' required />
                <div className='space-y-2'>
                  <Input type='password' placeholder='Password' required />
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
                  className='bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white transition-colors'
                >
                  Sign In
                </Button>
                <div className='relative my-6'>
                  <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t border-gray-200 dark:border-purple-600/50' />
                  </div>
                  <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-gray-50 dark:bg-purple-800/95 px-2 text-gray-500 dark:text-gray-400'>
                      Or continue with
                    </span>
                  </div>
                </div>
                <Button
                  variant='outline'
                  fullWidth
                  size='lg'
                  className='border-gray-200 bg-white hover:bg-gray-50 dark:border-purple-400 dark:bg-purple-700/95 dark:text-gray-100 dark:hover:bg-purple-400/50 transition-colors'
                >
                  <GoogleIcon className='w-5 h-5 mr-2' />
                  Sign in with Google
                </Button>
                <p className='text-sm text-center mt-6 text-gray-500 dark:text-gray-400'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/sign-up'
                    className='text-purple-500 hover:text-purple-600 dark:text-purple-200 dark:hover:text-purple-100 transition-colors'
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
