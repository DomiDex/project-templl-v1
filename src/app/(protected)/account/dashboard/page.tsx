import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export default function DashboardPage() {
  return (
    <main>
      <Section padding='lg'>
        <Container>
          <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
          {/* Add your dashboard content here */}
        </Container>
      </Section>
    </main>
  );
}
