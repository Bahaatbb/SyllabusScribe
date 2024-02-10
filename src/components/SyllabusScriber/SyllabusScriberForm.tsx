import { Container, Flex, Text, rem } from '@mantine/core';
import { useState } from 'react';
import { StepOneForm } from './StepOneForm';
import { StepTwoForm } from './StepTwoForm';

export const SyllabusScriberForm = () => {
  return (
    <Container>
      <Flex direction="column" justify="center" align="center"  m="auto">
        <StepOneForm />
      </Flex>
    </Container>
  );
};
