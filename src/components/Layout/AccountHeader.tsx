'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { Logo } from '@/components/ui/logo';
import { MainNav } from './Navigation/MainNav';
import { ThemeSwitch } from '@/features/theme/components/theme-switch';
import SignInSystem from '@/features/auth/components/SignInSystem';
import Link from 'next/link';
import { NavigationItem } from './Navigation/MainNav';

export default function AccountHeader() {
  const [username, setUsername] = useState<string | null>(null);
  const { user } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('profile_username')
          .eq('id', user.id)
          .single();

        setUsername(profile?.profile_username || null);
      }
    };

    fetchProfile();
  }, [user?.id, supabase]);

  const accountNavigationItems: NavigationItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Profile', href: '/account/profile' },
    {
      label: 'Promote Yourself',
      items: [
        {
          label: 'Add a Template',
          href: `/account/${username || user?.id}/add-templates`,
        },
        {
          label: 'Add Services',
          href: `/account/${username || user?.id}/add-services`,
        },
        {
          label: 'Add Project',
          href: `/account/${username || user?.id}/add-projects`,
        },
      ],
    },
  ];

  return (
    <header className=' w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4'>
      <div className='container flex h-14 items-center'>
        <Link href='/' className='mr-6'>
          <Logo width={90} height={30} />
        </Link>
        <MainNav items={accountNavigationItems} />
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <ThemeSwitch />
            <SignInSystem />
          </nav>
        </div>
      </div>
    </header>
  );
}
