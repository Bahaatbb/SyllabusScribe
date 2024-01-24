import { Container, Flex, rem} from '@mantine/core';
import { useState } from 'react';
import { StepOneForm } from './StepOneForm';

export const SyllabusScriberForm = () => {
  const [active, setActive] = useState(0);
  const [highestStepVisited, setHighestStepVisited] = useState(active);

  const handleStepChange = (nextStep: number) => {
    const isOutOfBounds = nextStep > 3 || nextStep < 0;

    if (isOutOfBounds) {
      return;
    }

    setActive(nextStep);
    setHighestStepVisited((hSC) => Math.max(hSC, nextStep));
  };

  // Allow the user to freely go back and forth between visited steps.
  const shouldAllowSelectStep = (step: number) => highestStepVisited >= step && active !== step;
  return (
    <Container>
      <Flex 
        direction="column"
        justify='center'
        align='center'
        w={rem(600)}
        h={rem(500)}
        m='auto'
      >
        <StepOneForm />
      </Flex>
    </Container>
  );
};
