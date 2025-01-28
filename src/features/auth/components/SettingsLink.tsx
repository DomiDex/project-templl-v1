'use client';

import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '../stores/useAuthStore';

export default function SettingsLink() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Link
      href={`/settings/${user?.id}`}
      className='flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors'
    >
      <Settings className='w-5 h-5' />
      <p className='text-sm'>settings</p>
    </Link>
  );
}
