'use client';

import { Logo } from '@/components/ui/logo';
import { XIcon, LinkedInIcon } from '@/components/ui/icons/social-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-gray-200 dark:bg-purple-800 px-4 py-8 sm:px-8 md:px-16 md:pt-24 md:pb-8 transition-colors duration-300'>
      <div className='container mx-auto max-w-7xl'>
        <div className='flex flex-col justify-between items-center'>
          <div className='mb-8 transition-transform hover:scale-105 duration-300'>
            <Logo width={120} height={40} />
          </div>

          <nav className='flex flex-col md:flex-row justify-center items-center gap-6 mb-6'>
            <Link
              href='/profile'
              className='text-gray-600 dark:text-gray-200 text-xl hover:text-purple-500 dark:hover:text-purple-300 hover:scale-105 transition-all duration-300'
            >
              Templates Designers
            </Link>
            <div className='h-[1px] w-3 bg-gray-300 dark:bg-gray-600 hidden md:block'></div>
            <Link
              href='/templates'
              className='text-gray-600 dark:text-gray-200 text-xl hover:text-purple-500 dark:hover:text-purple-300 hover:scale-105 transition-all duration-300'
            >
              Templates
            </Link>
            <div className='h-[1px] w-3 bg-gray-300 dark:bg-gray-600 hidden md:block'></div>
            <Link
              href='/category'
              className='text-gray-600 dark:text-gray-200 text-xl hover:text-purple-500 dark:hover:text-purple-300 hover:scale-105 transition-all duration-300'
            >
              Categories
            </Link>
            <div className='h-[1px] w-3 bg-gray-300 dark:bg-gray-600 hidden md:block'></div>
            <Link
              href='/about'
              className='text-gray-600 dark:text-gray-200 text-xl hover:text-purple-500 dark:hover:text-purple-300 hover:scale-105 transition-all duration-300'
            >
              About Me
            </Link>
            <div className='h-[1px] w-3 bg-gray-300 dark:bg-gray-600 hidden md:block'></div>
            <a
              href='mailto:domidex01@gmail.com'
              className='text-gray-600 dark:text-gray-200 text-xl hover:text-purple-500 dark:hover:text-purple-300 hover:scale-105 transition-all duration-300'
            >
              Contact Me
            </a>
          </nav>

          <div className='flex flex-row justify-center items-center gap-6 mb-12'>
            <a
              href='https://x.com/domidexdesign'
              className='text-gray-600 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-300 hover:scale-110 transition-all duration-300'
            >
              <XIcon />
            </a>
            <a
              href='https://www.linkedin.com/in/dominique-degottex-08420778/'
              className='text-gray-600 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-300 hover:scale-110 transition-all duration-300'
            >
              <LinkedInIcon />
            </a>
          </div>

          <div className='bg-gray-300 dark:bg-gray-600 w-full h-[0.5px] mb-6 transition-colors duration-300'></div>

          <div className='w-full flex flex-col md:flex-row justify-between items-center gap-6'>
            <p className='text-gray-500 dark:text-gray-400 text-xs'>
              © 2024 Templl | All rights reserved
            </p>
            <div className='flex flex-row justify-center items-center gap-4'>
              <Link
                href='/privacy'
                className='text-gray-500 dark:text-gray-400 text-xs hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-300'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-gray-500 dark:text-gray-400 text-xs hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-300'
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
