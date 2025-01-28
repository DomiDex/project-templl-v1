import { Upload } from 'lucide-react';
import Link from 'next/link';
import LoginLogout from './LoginLogout';
import SettingsLink from './SettingsLink';

export default function SignInSystem() {
  return (
    <div className='flex items-center gap-2'>
      <SettingsLink />
      <div className='flex items-center gap-2 bg-purple-200 dark:bg-purple-800 p-2 rounded-md'>
        <LoginLogout />
        <Link
          href='/sign-up'
          className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-400 dark:hover:bg-purple-300 dark:text-white text-gray-50 transition-colors duration-300 px-4 py-2 rounded-md'
        >
          <p>Submit Here</p>
          <Upload className='w-5 h-5' />
        </Link>
      </div>
    </div>
  );
}
