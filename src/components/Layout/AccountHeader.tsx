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
    label: 'Settings',
    items: [
      { label: 'Account Settings', href: '/account/settings' },
      { label: 'Notifications', href: '/account/notifications' },
      { label: 'Security', href: '/account/security' },
    ],
  },
  { label: 'Billing', href: '/account/billing' },
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
