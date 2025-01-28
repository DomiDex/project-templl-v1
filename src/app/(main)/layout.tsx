import MainHeader from '@/components/Layout/MainHeader';
import Footer from '@/components/Footer';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      {children}
      <Footer />
    </>
  );
}
