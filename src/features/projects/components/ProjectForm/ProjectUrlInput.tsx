import { INPUT_CLASSES } from './constants';

interface ProjectUrlInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectUrlInput({ value, onChange }: ProjectUrlInputProps) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASSES}
        placeholder='https://your-project.com'
      />
    </div>
  );
}
