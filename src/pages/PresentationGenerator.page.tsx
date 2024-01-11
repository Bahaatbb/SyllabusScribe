import { Container, GeneratePresentationForm } from '@/components';
import {  Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import YourPresentationts from '@/components/Presentations/YourPresentationts';
const PresentationGenerator = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
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
            Your presentations
          </Text>
         
        </Flex>
        <Divider />
        <YourPresentationts />
      </Container>
    </motion.div>
  );
};

export { PresentationGenerator };
