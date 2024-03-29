import { Container, GeneratePresentationForm } from '@/components';
import {  Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import {YourPresentationts} from '@/components';
const PresentationGenerator = () => {
  const containerVariants = {
    hidden: { opacity: 0, },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Slides Generator" has_parent>
        <Text my="lg" fw={600}>
          Create new presentation
        </Text>
        <Divider />

        <GeneratePresentationForm />
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
            Your Presentations
          </Text>
         
        </Flex>
        <Divider />
        <YourPresentationts />
      </Container>
    </motion.div>
  );
};

export { PresentationGenerator };
