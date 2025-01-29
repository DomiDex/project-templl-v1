'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';

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

interface StackOption {
  id: string;
  stack_name: string;
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

  const [stacks, setStacks] = useState<StackOption[]>([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in to add a project');
      return;
    }

    try {
      // Generate URL-friendly path from project name and add random suffix for uniqueness
      const baseSlug = formData.project_name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const randomSuffix = Math.random().toString(36).substring(2, 7);
      const path = `${baseSlug}-${randomSuffix}`;

      // Prepare project data
      const projectData = {
        project_name: formData.project_name,
        path: path,
        stack_id: formData.stack_id,
        project_link: formData.project_link,
        meta_title: formData.meta_title || formData.project_name,
        meta_description:
          formData.meta_description || formData.long_description,
        long_description: formData.long_description,
        og_image_url: formData.og_image_url,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Insert project data
      const { error: insertError } = await supabase
        .from('projects')
        .insert(projectData);

      if (insertError) {
        throw new Error(`Failed to create project: ${insertError.message}`);
      }

      // Success handling
      alert('Project added successfully!');
      // Clear form
      setFormData({
        project_name: '',
        path: '',
        stack_id: '',
        project_link: '',
        meta_title: '',
        meta_description: '',
        long_description: '',
        og_image_url: '',
      });
    } catch (error) {
      console.error('Error details:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Failed to add project. Please try again.'
      );
    }
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
      <div className='flex gap-4'>
        <div className='flex-1'>
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

        <div className='flex-1'>
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
            {stacks.map((stack) => (
              <option key={stack.id} value={stack.id}>
                {stack.stack_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='flex-1'>
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

      <div className='space-y-2'>
        <label
          htmlFor='og_image_url'
          className='block text-sm font-medium text-gray-700 dark:text-gray-200'
        >
          Open Graph Image
        </label>

        <div className='flex items-center justify-center w-full'>
          <label
            htmlFor='og_image_upload'
            className={`${
              formData.og_image_url
                ? 'hidden'
                : 'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-600'
            }`}
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <UploadCloud className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' />
              <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                PNG, JPG or WebP (MAX. 2MB)
              </p>
            </div>
            <input
              id='og_image_upload'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file || !user?.id) {
                  alert('Please sign in to upload images');
                  return;
                }

                if (file.size > 2 * 1024 * 1024) {
                  alert('File size must be less than 2MB');
                  return;
                }

                try {
                  const fileExt = file.name.split('.').pop()?.toLowerCase();
                  if (
                    !fileExt ||
                    !['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)
                  ) {
                    throw new Error(
                      'Invalid file type. Please upload JPG, PNG, or WebP images only.'
                    );
                  }

                  const fileName = `${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(2)}.${fileExt}`;
                  const filePath = `${user.id}/${fileName}`;

                  const { error: uploadError } = await supabase.storage
                    .from('project-images')
                    .upload(filePath, file, {
                      cacheControl: '3600',
                      upsert: false,
                    });

                  if (uploadError) {
                    throw new Error(
                      'Failed to upload image: ' + uploadError.message
                    );
                  }

                  const {
                    data: { publicUrl },
                  } = supabase.storage
                    .from('project-images')
                    .getPublicUrl(filePath);

                  setFormData({ ...formData, og_image_url: publicUrl });
                } catch (error) {
                  console.error('Upload error details:', error);
                  alert(
                    error instanceof Error
                      ? error.message
                      : 'Error uploading image. Please try again.'
                  );
                }
              }}
            />
          </label>

          {formData.og_image_url && (
            <div className='relative w-full h-64'>
              <Image
                src={formData.og_image_url}
                alt='Project preview'
                fill
                className='rounded-lg object-cover'
              />
              <button
                type='button'
                onClick={() => setFormData({ ...formData, og_image_url: '' })}
                className='absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          )}
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
