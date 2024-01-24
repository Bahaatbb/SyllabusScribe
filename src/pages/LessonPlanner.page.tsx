import { Container, GeneratePlanForm, GeneratePresentationForm, Plans } from '@/components';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const LessonPlanner = () => {
  const containerVariants = {
    hidden: { opacity: 0,  },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Lesson Planner" has_parent>
        <Text my="lg" fw={600}>
          Create new Lesson Plan
        </Text>
        <Divider />
        <GeneratePlanForm />
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
            Your Lesson Plans
          </Text>
        </Flex>
        <Divider />
        <Plans />
      </Container>
    </motion.div>
  );
};

export { LessonPlanner };
