'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MobileNavProps {
  children: React.ReactNode;
}

export function MobileNav({ children }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
        aria-label='Toggle navigation menu'
      >
        {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
      </button>

      <div
        className={cn(
          'fixed inset-y-0 left-0 transform lg:hidden bg-white dark:bg-gray-800 w-64 transition-transform duration-300 ease-in-out z-30',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='p-6 space-y-4'>{children}</div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20'
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
