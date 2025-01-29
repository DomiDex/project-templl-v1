import { Button } from '@/components/ui/button';

interface SubmitButtonProps {
  loading?: boolean;
}

export function SubmitButton({ loading }: SubmitButtonProps) {
  return (
    <Button
      type='submit'
      disabled={loading}
      className='w-full bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white transition-colors'
    >
      {loading ? 'Adding Project...' : 'Add Project'}
    </Button>
  );
}
