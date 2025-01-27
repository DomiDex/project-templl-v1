import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: '../../public/fonts/PPMori-Book.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPMori-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPMori-ExtraBold.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
  display: 'swap',
});
