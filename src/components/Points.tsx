import { Box, Flex } from '@mantine/core';
import React from 'react';

export const Points = () => {
  return (
    <Flex
      align={'center'}
      direction={'column'}
      h={'15px'}
      justify={'space-between'}
      w={'15px'}
      style={{
        cursor: 'pointer',
      }}
    >
      <Box
        style={{
          width: '4px',
          height: '4px',
          backgroundColor: '#323232',
          borderRadius: '50%',
        }}
      ></Box>
      <Box
        style={{
          width: '4px',
          height: '4px',
          backgroundColor: '#323232',
          borderRadius: '50%',
        }}
      ></Box>
      <Box
        style={{
          width: '4px',
          height: '4px',
          backgroundColor: '#323232',
          borderRadius: '50%',
        }}
      ></Box>
    </Flex>
  );
};
