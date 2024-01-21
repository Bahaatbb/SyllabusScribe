import { Flex, Divider, Text } from '@mantine/core';
import React from 'react';
import { Worksheets } from '../Worksheets';

export const LessonWorksheets = () => {
  return (
    <Flex gap={'sm'} direction={'column'} mt={'lg'}>
      <Text fz={'lg'} fw={'bold'}>
        Your Workshets
      </Text>
      <Divider />
      <Worksheets />
    </Flex>
  );
};
