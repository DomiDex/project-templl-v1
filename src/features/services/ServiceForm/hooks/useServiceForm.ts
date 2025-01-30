import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { ServiceFormData } from '../types';
import { INITIAL_FORM_DATA } from '../constants';

export function useServiceForm() {
  const [formData, setFormData] = useState<ServiceFormData>(INITIAL_FORM_DATA);
  const { user } = useAuthStore();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to add a service');
      return;
    }

    try {
      const serviceData = {
        ...formData,
        path: undefined,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase
        .from('services')
        .insert(serviceData);

      if (insertError) {
        throw new Error(`Failed to create service: ${insertError.message}`);
      }

      alert('Service added successfully!');
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error('Error details:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to add service. Please try again.'
      );
    }
  };

  return { formData, setFormData, handleSubmit };
}
