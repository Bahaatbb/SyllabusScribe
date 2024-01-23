import { Flex, Divider, Text } from '@mantine/core';
import { Units } from '../Units';

export const LessonUnits = () => {
  return (
    <Flex gap={'sm'} direction={'column'} mt={'lg'}>
      <Text fz={'lg'} fw={'bold'}>
        Your Plans
      </Text>
      <Divider />
      <Units />
    </Flex>
  );
};
