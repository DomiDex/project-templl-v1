'use client';

import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import Index from '@/features/projects/components/ProjectForm';

export default function Page() {
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

  const breadcrumbItems = [
    {
      label: 'Account',
      href: `/account/${username || user?.id}`,
    },
    {
      label: 'Add Projects',
      href: `/account/${username || user?.id}/add-projects`,
    },
  ];

  return (
    <Section padding='lg'>
      <Container size='lg'>
        <Breadcrumb items={breadcrumbItems} className='mb-6' />
        <div className='max-w-2xl '>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8'>
            Add Your Project
          </h1>
          <Index />
        </div>
      </Container>
    </Section>
  );
}
