import { Container } from '@/components';
import { Box, NumberInput } from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import React from 'react';

const PresentationGenerator = () => {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <Container has_parent>
      <Box
        w={'100%'}
        h={'100%'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e1e1e1',
          radius: '10px'
        }}
        p={'lg'}
      >
        <Box component="form"
        >
          <NumberInput
            label="Number of Slides"
            placeholder="Input placeholder"
            max={10}
            min={1}
            defaultValue={1}
          />
        </Box>
      </Box>
    </Container>
  );
};

export { PresentationGenerator };
