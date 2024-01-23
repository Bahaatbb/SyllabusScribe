import { Container,StudentPerformance } from '@/components';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const StudentPerformanceModel = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Lesson Planner" has_parent>
        <StudentPerformance />
      </Container>
    </motion.div>
  );
};

export { StudentPerformanceModel };
