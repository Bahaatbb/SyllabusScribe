import { Flex, Divider, Text } from '@mantine/core';
import React from 'react';
import { Contexts } from '../Contexts';

export const LessonContexts = () => {
  return (
    <Flex gap={'sm'} direction={'column'} mt={'lg'}>
      <Text fz={'lg'} fw={'bold'}>
        Your Contexts
      </Text>
      <Divider />
      <Contexts />
    </Flex>
  );
};
