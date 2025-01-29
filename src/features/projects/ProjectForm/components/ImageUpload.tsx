import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

export function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
  const { user } = useAuthStore();
  const supabase = createClient();

  const handleImageUpload = async (file: File) => {
    if (!user?.id) {
      alert('Please sign in to upload images');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (!fileExt || !['jpg', 'jpeg', 'png', 'webp'].includes(fileExt)) {
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
        throw new Error('Failed to upload image: ' + uploadError.message);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('project-images').getPublicUrl(filePath);

      onImageChange(publicUrl);
    } catch (error) {
      console.error('Upload error details:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Error uploading image. Please try again.'
      );
    }
  };

  return (
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
            imageUrl
              ? 'hidden'
              : 'flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-600'
          }`}
        >
          <div className='flex flex-col items-center justify-center pt-5 pb-6'>
            <UploadCloud className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' />
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(file);
              }
            }}
          />
        </label>

        {imageUrl && (
          <div className='relative w-full h-64'>
            <Image
              src={imageUrl}
              alt='Project preview'
              fill
              className='rounded-lg object-cover'
            />
            <button
              type='button'
              onClick={() => onImageChange('')}
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
  );
}
