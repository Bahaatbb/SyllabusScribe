import { Container, GeneratePlanForm, GeneratePresentationForm, Plans } from '@/components';
import { Worksheets } from '@/components';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const WorksheetsCreator = () => {
  const containerVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Worksheet" has_parent>
        <Text my="lg" fw={600}>
          Create new Worksheet
        </Text>
        <Divider />

        <GeneratePlanForm />
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
            Your Worksheets
          </Text>
        </Flex>
        <Worksheets />
      </Container>
    </motion.div>
  );
};

export { WorksheetsCreator };
