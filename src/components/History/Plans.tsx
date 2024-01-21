import { Flex, Divider, Text } from '@mantine/core';
import { Plans } from '../Plans';

export const LessonPlans = () => {
  return (
    <Flex gap={'sm'} direction={'column'} mt={'lg'}>
      <Text fz={'lg'} fw={'bold'}>
        Your Plans
      </Text>
      <Divider />
      <Plans />
    </Flex>
  );
};
