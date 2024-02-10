import { SyllabusScriberForm, Container } from '@/components';
import { motion } from 'framer-motion';

export const SyllabusScriber = () => {
  const containerVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
    <Container title="Syllabus Scriber">
      <SyllabusScriberForm />
    </Container>
  </motion.div>
  )
}
