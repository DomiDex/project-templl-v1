'use client';

import { Logo } from '@/components/ui/logo';
import { MainNav } from './Navigation/MainNav';
import { ThemeSwitch } from '@/features/theme/components/theme-switch';
import SignInSystem from '@/features/auth/components/SignInSystem';
import Link from 'next/link';

const accountNavigationItems = [
  { label: 'Dashboard', href: '/account/dashboard' },
  { label: 'Profile', href: '/account/profile' },
  {
    label: 'Promote Yourself',
    items: [
      { label: 'Add a Template', href: '/account/settings' },
      { label: 'add Services', href: '/account/notifications' },
      { label: 'Add Open Source Project', href: '/account/security' },
    ],
  },
];

export default function AccountHeader() {
  return (
    <header className='flex justify-between items-center px-4 py-2'>
      <div className='flex items-center gap-8'>
        <Link href='/account/dashboard'>
          <Logo width={90} height={30} />
        </Link>
        <MainNav navigationItems={accountNavigationItems} />
      </div>
      <div className='flex items-center gap-2'>
        <ThemeSwitch />
        <SignInSystem />
      </div>
    </header>
  );
}
