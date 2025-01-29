import { INPUT_CLASSES } from './constants';

interface ProjectDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectDescription({
  value,
  onChange,
}: ProjectDescriptionProps) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className={INPUT_CLASSES}
        placeholder='Describe your project'
      />
    </div>
  );
}
