import { Container, Contexts, BuildContextForm } from '@/components';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const ContextBuilder = () => {
  const containerVariants = {
    hidden: { opacity: 0,  },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Context Builder" has_parent>
        <Text my="lg" fw={600}>
          Create new Context
        </Text>
        <Divider />

        <BuildContextForm />
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
            Your Contexts
          </Text>
        </Flex>
        <Divider />
        <Contexts />
      </Container>
    </motion.div>
  );
};

export { ContextBuilder };
