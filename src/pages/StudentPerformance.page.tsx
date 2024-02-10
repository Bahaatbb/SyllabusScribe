import { Container,StudentPerformance } from '@/components';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const StudentPerformanceModel = () => {
  const containerVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Student Performace" has_parent>
        <StudentPerformance />
      </Container>
    </motion.div>
  );
};

export { StudentPerformanceModel };
