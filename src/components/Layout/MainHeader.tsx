import { Logo } from '@/components/ui/logo';
import { MainNav } from './Navigation/MainNav';
import { ThemeSwitch } from '@/features/theme/components/theme-switch';
import SignInSystem from '@/features/auth/components/SignInSystem';
import Link from 'next/link';

export default function MainHeader() {
  return (
    <header className='flex justify-between items-center px-4 py-2'>
      <div className='flex items-center gap-8'>
        <Link href='/'>
          <Logo width={90} height={30} />
        </Link>
        <MainNav />
      </div>
      <div className='flex items-center gap-2'>
        <ThemeSwitch />
        <SignInSystem />
      </div>
    </header>
  );
}
