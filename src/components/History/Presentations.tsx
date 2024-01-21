import { YourPresentationts } from '../Presentations';
import { Divider, Flex, Text, rem } from '@mantine/core';

export const Presentations = () => {
  return (
    <Flex gap={'sm'} direction={'column'} mt={'lg'}>
        <Text fz={'lg'} fw={'bold'}>Your presentations</Text>
      <Divider />
      <YourPresentationts />
    </Flex>
  );
};
