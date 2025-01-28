import AccountHeader from '@/components/Layout/AccountHeader';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AccountHeader />
      {children}
    </>
  );
}
