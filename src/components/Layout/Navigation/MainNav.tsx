'use client';

import { NavLink } from './NavLink';
import { NavDropdown } from './NavDropdown';
import { MobileNav } from './MobileNav';
import { cn } from '@/utils/cn';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavItemWithDropdown {
  label: string;
  items: NavItem[];
}

export type NavigationItem = NavItem | NavItemWithDropdown;

export interface MainNavProps {
  items?: NavigationItem[];
}

const defaultNavigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    items: [
      { label: 'Consulting', href: '/services/consulting' },
      { label: 'Development', href: '/services/development' },
      { label: 'Design', href: '/services/design' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export function MainNav({ items = defaultNavigationItems }: MainNavProps) {
  const renderNavItems = (mobile = false) => (
    <>
      {items.map((item) => {
        if ('items' in item) {
          return (
            <NavDropdown key={item.label} label={item.label}>
              <div className={mobile ? 'space-y-2' : 'space-y-1'}>
                {item.items.map((subItem) => (
                  <NavLink
                    key={subItem.href}
                    href={subItem.href}
                    className={cn(
                      'block px-4 py-2 text-sm',
                      mobile && 'text-base'
                    )}
                  >
                    {subItem.label}
                  </NavLink>
                ))}
              </div>
            </NavDropdown>
          );
        }

        return (
          <NavLink
            key={item.href}
            href={item.href}
            className={mobile ? 'block text-base' : ''}
          >
            {item.label}
          </NavLink>
        );
      })}
    </>
  );

  return (
    <nav>
      {/* Desktop Navigation */}
      <div className='hidden lg:flex items-center space-x-8'>
        {renderNavItems()}
      </div>

      {/* Mobile Navigation */}
      <MobileNav>
        <div className='space-y-4'>{renderNavItems(true)}</div>
      </MobileNav>
    </nav>
  );
}
