import { cn } from '../../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: keyof typeof backgroundColors;
  darkBackground?: keyof typeof backgroundColors;
  fullHeight?: boolean;
  noPadding?: boolean;
}

const paddingSizes = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};

const backgroundColors = {
  background: 'bg-background',
  foreground: 'bg-foreground',
  lightGray: 'bg-gray-100',
  darkerGray: 'bg-gray-200',
  darkGray: 'bg-gray-400',
  lightPurple: 'bg-purple-400',
  purple: 'bg-purple-500',
  darkPurple: 'bg-purple-600',
  hoverGray: 'bg-hover-light',
  white: 'bg-white',
  primary: 'bg-purple-500',
  secondary: 'bg-gray-100',
  muted: 'bg-gray-50',
};

export function Section({
  as: Component = 'section',
  padding = 'md',
  background,
  darkBackground,
  fullHeight = false,
  noPadding = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        !noPadding && paddingSizes[padding],
        background && backgroundColors[background],
        darkBackground && `dark:${backgroundColors[darkBackground]}`,
        fullHeight && 'h-screen',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
