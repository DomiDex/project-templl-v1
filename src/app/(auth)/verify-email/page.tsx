import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

export default function VerifyEmailPage() {
  return (
    <main>
      <Section fullHeight>
        <Container
          size='sm'
          className='flex flex-col items-center justify-center min-h-screen'
        >
          <h1 className='text-2xl font-bold mb-4 text-center'>
            Check your email
          </h1>
          <p className='text-center text-gray-600 dark:text-gray-300'>
            We've sent you an email with a link to verify your account. Please
            check your inbox and follow the instructions.
          </p>
        </Container>
      </Section>
    </main>
  );
}
