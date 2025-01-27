export function AuthError({ message }: { message: string }) {
  return (
    <div className='p-3 rounded-md bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50'>
      <p className='text-sm text-red-600 dark:text-red-400'>{message}</p>
    </div>
  );
}
