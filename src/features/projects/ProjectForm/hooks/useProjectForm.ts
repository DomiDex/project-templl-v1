import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { ProjectFormData } from '../types';
import { INITIAL_FORM_DATA } from '../constants';

export function useProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>(INITIAL_FORM_DATA);
  const { user } = useAuthStore();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please sign in to add a project');
      return;
    }

    try {
      const baseSlug = formData.project_name
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9-\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

      const randomSuffix = Math.random().toString(36).substring(2, 7);
      const path = `${baseSlug}-${randomSuffix}`;

      const projectData = {
        ...formData,
        path,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase
        .from('projects')
        .insert(projectData);

      if (insertError) {
        throw new Error(`Failed to create project: ${insertError.message}`);
      }

      alert('Project added successfully!');
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error('Error details:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to add project. Please try again.'
      );
    }
  };

  return { formData, setFormData, handleSubmit };
}
