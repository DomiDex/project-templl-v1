import { INPUT_CLASSES } from '../constants';

interface ServiceNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceNameInput({ value, onChange }: ServiceNameInputProps) {
  return (
    <div className='flex-1'>
      <label
        htmlFor='service_name'
        className='block text-sm font-medium text-gray-700 dark:text-gray-200'
      >
        Service Name
      </label>
      <input
        id='service_name'
        type='text'
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASSES}
        placeholder='Enter service name'
      />
    </div>
  );
}
