import { INPUT_CLASSES } from '../constants';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function PriceInput({ value, onChange }: PriceInputProps) {
  return (
    <div className='flex-1'>
      <label
        htmlFor='price'
        className='block text-sm font-medium text-gray-700 dark:text-gray-200'
      >
        Price
      </label>
      <div className='relative'>
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
          $
        </span>
        <input
          id='price'
          type='number'
          min='0'
          step='0.01'
          required
          value={Number(value) || ''}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`${INPUT_CLASSES} pl-7`}
          placeholder='0.00'
        />
      </div>
    </div>
  );
}
