import { Flex, Divider, Text } from '@mantine/core';
import { Quizzes } from '../Quizzes';

export const LessonQuizzes = () => {
  return (
    <Flex gap={'sm'} direction={'column'} mt={'lg'}>
      <Text fz={'lg'} fw={'bold'}>
        Your Quizzes
      </Text>
      <Divider />
      <Quizzes />
    </Flex>
  );
};
