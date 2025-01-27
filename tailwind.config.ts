import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        lightGray: '#F2F2F2',
        darkerGray: '#E6E5E8',
        lightPurple: '#726170',
        purple: '#4F394C',
        darkPurple: '#474554',
        darkGray: '#B6B6B6',
        hoverGray: '#DADADD',
        white: '#FFFFFF',
        'red-500': '#FF4332',
      },
      fontFamily: {
        custom: ['var(--font-custom)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
