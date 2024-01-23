import { Container, GeneratePlanForm, GeneratePresentationForm, Plans } from '@/components';
import { Units } from '@/components/Units';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const UnitPlanner = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Unit Planner" has_parent>
        <Text my="lg" fw={600}>
          Create new Unit Plan
        </Text>
        <Divider />

        <GeneratePlanForm />
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
            Your Unit Plans
          </Text>
        </Flex>
        <Divider />
        <Units />
      </Container>
    </motion.div>
  );
};

export { UnitPlanner };
