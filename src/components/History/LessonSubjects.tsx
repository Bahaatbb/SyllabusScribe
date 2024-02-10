import { Flex, Divider, Text } from '@mantine/core';
import { Subjects } from '../Subjects';

export const LessonSubjects = () => {
  return (
    <Flex gap={'sm'} direction={'column'} mt={'lg'}>
      <Text fz={'lg'} fw={'bold'}>
        Your Subjects
      </Text>
      <Divider />
      <Subjects />
    </Flex>
  );
};
