interface SubmitButtonProps {
  loading: boolean;
}

export function SubmitButton({ loading }: SubmitButtonProps) {
  return (
    <button
      type='submit'
      disabled={loading}
      className='w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white 
                hover:bg-purple-700 dark:hover:bg-purple-500 
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                dark:focus:ring-offset-gray-800 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {loading ? 'Adding Service...' : 'Add Service'}
    </button>
  );
}
