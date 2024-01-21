import { Button, Container, Group, Stepper, rem } from '@mantine/core';
import {
  IconCircleCheck,
  IconUserCheck,
  IconMailOpened,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useState } from 'react';
import { StepOneForm } from './StepOneForm';
import { StepTwoForm } from './StepTwoForm';
import { StepThreeForm } from './StepThreeForm';

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
      <Stepper
        iconSize={32}
        active={active}
        onStepClick={setActive}
        completedIcon={<IconCircleCheck style={{ width: rem(18), height: rem(18) }} />}
      >
        <Stepper.Step
          icon={<IconUserCheck style={{ width: rem(18), height: rem(18) }} />}
          label="First step"
          description="Create an account"
          allowStepSelect={shouldAllowSelectStep(0)}
        >
          <StepOneForm />
        </Stepper.Step>
        <Stepper.Step
          icon={<IconMailOpened style={{ width: rem(18), height: rem(18) }} />}
          label="Second step"
          description="Verify email"
          allowStepSelect={shouldAllowSelectStep(1)}
        >
          <StepTwoForm />
        </Stepper.Step>
        <Stepper.Step
          icon={<IconShieldCheck style={{ width: rem(18), height: rem(18) }} />}
          label="Final step"
          description="Get full access"
          allowStepSelect={shouldAllowSelectStep(2)}
        >
          <StepThreeForm />
        </Stepper.Step>

        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={() => handleStepChange(active - 1)}>
          Back
        </Button>
        <Button onClick={() => handleStepChange(active + 1)}>Next step</Button>
      </Group>
    </Container>
  );
};
