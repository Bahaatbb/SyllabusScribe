import { Container, Worksheets, BuildWorkSheetForm } from '@/components';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const WorksheetsCreator = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Handout" has_parent>
        <Text my="lg" fw={600}>
          Create new Handout
        </Text>
        <Divider />
        <BuildWorkSheetForm />
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
            Your Handouts
          </Text>
        </Flex>
        <Worksheets />
      </Container>
    </motion.div>
  );
};

export { WorksheetsCreator };
