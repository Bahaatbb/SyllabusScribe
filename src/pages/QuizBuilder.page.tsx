import { Container, GeneratePlanForm, GenerateQuizForm, Quizzes } from '@/components';
import { Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
const QuizBuilder = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Quiz Builder" has_parent>
        <Text my="lg" fw={600}>
          Create new Quiz
        </Text>
        <Divider />

        <GenerateQuizForm />
        <Flex align={'center'} justify={'space-between'}>
          <Text my="lg" fw={600}>
            Your Quizzes
          </Text>
        </Flex>
        <Divider />
        <Quizzes />
      </Container>
    </motion.div>
  );
};

export { QuizBuilder };
