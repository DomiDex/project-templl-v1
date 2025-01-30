import { INPUT_CLASSES } from '../constants';

interface MetaFieldsProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function MetaFields({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: MetaFieldsProps) {
  return (
    <div className='space-y-4'>
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
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={INPUT_CLASSES}
          placeholder='SEO title for your service'
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
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={2}
          className={INPUT_CLASSES}
          placeholder='SEO description for your service'
        />
      </div>
    </div>
  );
}
