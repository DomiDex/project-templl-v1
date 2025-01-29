import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { StackOption } from '../types';

export function useStackOptions() {
  const [stacks, setStacks] = useState<StackOption[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchStacks = async () => {
      const { data: stacksData, error } = await supabase
        .from('stacks')
        .select('id, stack_name');

      if (error) {
        console.error('Error fetching stacks:', error);
        return;
      }

      setStacks(stacksData || []);
    };

    fetchStacks();
  }, [supabase]);

  return { stacks };
}
