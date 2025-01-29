import { StackOption } from './types';
import { INPUT_CLASSES } from './constants';

interface StackSelectProps {
  value: string;
  onChange: (value: string) => void;
  stacks: StackOption[];
}

export function StackSelect({ value, onChange, stacks }: StackSelectProps) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASSES}
      >
        <option value=''>Select a stack</option>
        {stacks.map((stack) => (
          <option key={stack.id} value={stack.id}>
            {stack.stack_name}
          </option>
        ))}
      </select>
    </div>
  );
}
