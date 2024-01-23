import { Container } from '@/components/Container/Container';
import { SyllabusScriberForm } from '@/components/SyllabusScriber/SyllabusScriberForm';

export function HomePage() {
  return (
    <Container title="Syllabus Scriber">
        <SyllabusScriberForm />
    </Container>
  );
}
