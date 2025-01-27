import { ThemeSwitch } from '@/features/theme/components/theme-switch';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export default function Home() {
  return (
    <main className='min-h-screen p-4'>
      <nav className='flex justify-end p-4'>
        <ThemeSwitch />
      </nav>
      <h1>Hello World</h1>

      {/* Primary background that changes with theme */}
      <Section padding='lg' background='primary'>
        <Container size='lg'>
          <h1>Primary Section</h1>
        </Container>
      </Section>

      {/* Secondary background with dark mode support */}
      <Section padding='md' background='secondary'>
        <Container size='md'>
          <h2>Secondary Section</h2>
        </Container>
      </Section>

      {/* Muted background with dark mode support */}
      <Section padding='sm' background='muted'>
        <Container>
          <h3>Muted Section</h3>
        </Container>
      </Section>
    </main>
  );
}
