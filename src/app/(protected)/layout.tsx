import AccountHeader from '@/components/Layout/AccountHeader';
import Footer from '@/components/Layout/footer';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountHeader />
      {children}
      <Footer />
    </>
  );
}
