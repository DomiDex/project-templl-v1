import { INPUT_CLASSES } from './constants';

interface ProjectNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectNameInput({ value, onChange }: ProjectNameInputProps) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASSES}
        placeholder='Enter project name'
      />
    </div>
  );
}
