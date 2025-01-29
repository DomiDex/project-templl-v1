'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

interface ProjectFormData {
  project_name: string;
  path: string;
  stack_id: string;
  project_link: string;
  meta_title: string;
  meta_description: string;
  long_description: string;
  og_image_url: string;
}

export default function ProjectForm() {
  const { user } = useAuthStore();
  const supabase = createClient();
  const [formData, setFormData] = useState<ProjectFormData>({
    project_name: '',
    path: '',
    stack_id: '',
    project_link: '',
    meta_title: '',
    meta_description: '',
    long_description: '',
    og_image_url: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...formData,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('Project created:', data);
  };

  const inputClasses = `
    mt-1 block w-full rounded-md border border-gray-300 
    dark:border-gray-600 bg-white dark:bg-gray-700/50
    px-3 py-2 text-sm placeholder-gray-400 
    dark:placeholder-gray-300 text-gray-900 
    dark:text-gray-100 focus:border-purple-500 
    dark:focus:border-purple-400 focus:outline-none 
    focus:ring-1 focus:ring-purple-500 
    dark:focus:ring-purple-400 transition-colors
  `;

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='project_name'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'
          >
            Project Name
          </label>
          <input
            id='project_name'
            type='text'
            required
            value={formData.project_name}
            onChange={(e) =>
              setFormData({ ...formData, project_name: e.target.value })
            }
            className={inputClasses}
            placeholder='Enter project name'
          />
        </div>

        <div>
          <label
            htmlFor='path'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'
          >
            Project Path
          </label>
          <input
            id='path'
            type='text'
            required
            value={formData.path}
            onChange={(e) => setFormData({ ...formData, path: e.target.value })}
            className={inputClasses}
            placeholder='e.g., my-awesome-project'
          />
        </div>

        <div>
          <label
            htmlFor='stack_id'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'
          >
            Stack
          </label>
          <select
            id='stack_id'
            required
            value={formData.stack_id}
            onChange={(e) =>
              setFormData({ ...formData, stack_id: e.target.value })
            }
            className={inputClasses}
          >
            <option value=''>Select a stack</option>
            <option value='next'>Next.js</option>
            <option value='react'>React</option>
            <option value='vue'>Vue</option>
          </select>
        </div>

        <div>
          <label
            htmlFor='project_link'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'
          >
            Project URL
          </label>
          <input
            id='project_link'
            type='url'
            required
            value={formData.project_link}
            onChange={(e) =>
              setFormData({ ...formData, project_link: e.target.value })
            }
            className={inputClasses}
            placeholder='https://your-project.com'
          />
        </div>

        <div>
          <label
            htmlFor='long_description'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'
          >
            Description
          </label>
          <textarea
            id='long_description'
            required
            value={formData.long_description}
            onChange={(e) =>
              setFormData({ ...formData, long_description: e.target.value })
            }
            rows={4}
            className={inputClasses}
            placeholder='Describe your project'
          />
        </div>

        <div>
          <label
            htmlFor='meta_title'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'
          >
            Meta Title
          </label>
          <input
            id='meta_title'
            type='text'
            value={formData.meta_title}
            onChange={(e) =>
              setFormData({ ...formData, meta_title: e.target.value })
            }
            className={inputClasses}
            placeholder='SEO title for your project'
          />
        </div>

        <div>
          <label
            htmlFor='meta_description'
            className='block text-sm font-medium text-gray-700 dark:text-gray-200'
          >
            Meta Description
          </label>
          <textarea
            id='meta_description'
            value={formData.meta_description}
            onChange={(e) =>
              setFormData({ ...formData, meta_description: e.target.value })
            }
            rows={2}
            className={inputClasses}
            placeholder='SEO description for your project'
          />
        </div>
      </div>

      <button
        type='submit'
        className='w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white 
                 hover:bg-purple-700 dark:hover:bg-purple-500 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                 dark:focus:ring-offset-gray-800 transition-colors'
      >
        Add Project
      </button>
    </form>
  );
}
