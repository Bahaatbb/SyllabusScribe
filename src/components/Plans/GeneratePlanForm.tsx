import { z } from 'zod';
import { useEffect } from 'react';
import { TextInput, NativeSelect, rem, Flex, Button, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconSchool } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import { notifications } from '@mantine/notifications';
import { useLessonPlanner } from '@/hooks/useLessonPlanner';
import { LoadingForm } from '../LoadingForm';

const schema = z.object({
  topic: z.string().min(1, 'Please enter a topic'),
  grade_level: z.string().min(1, 'Please enter a grade level'),
});

const GeneratePlanForm = () => {
  const { data, error, loading, createPlan, isSuccess } = useLessonPlanner();

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  const form = useForm<{ topic: string; grade_level: string }>({
    validate: zodResolver(schema),
    initialValues: {
      topic: '',
      grade_level: 'Elementary school',
    },

    validateInputOnBlur: true,
  });

  type FormValues = typeof form.values;

  const handleFormSubmit = async (values: FormValues) => {
    notifications.show({
      title: 'Generating your lesson plan',
      message: 'Please wait while we generate your plan',
      loading: true,
    });

    createPlan(values);
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to generate plan',
        color: 'red',
      });
    }
    // prevent the form from submitting
    if (isSuccess) {
      notifications.show({
        title: 'Success',
        message: 'Plan was generated successfully',
        color: 'green',
      });
      form.reset();
    }
  }, [error, isSuccess]);

  return (
    <motion.div
      variants={formVariants}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        padding: '24px',
      }}
    >
      <Box style={{ width: 400, flex: 1 }}>
        <LoadingForm loading={loading}>
          <Box onSubmit={form.onSubmit((values) => handleFormSubmit(values))} component="form">
            <TextInput
              value={form.values.topic}
              onChange={(event) => form.setFieldValue('topic', event.currentTarget.value)}
              error={form.errors.topic}
              label="Topic"
              style={{ marginBottom: '16px' }}
              disabled={loading}
            />
            <NativeSelect
              leftSection={<IconSchool style={{ width: rem(16), height: rem(16) }} />}
              leftSectionPointerEvents="none"
              label="Grade Level"
              data={['Elementary school', 'Middle school', 'High school', 'College']}
              style={{ marginBottom: '16px' }}
              value={form.values.grade_level}
              onChange={(event) => form.setFieldValue('grade_level', event.currentTarget.value)}
              error={form.errors.grade_level}
              disabled={loading}
            />
            <Flex justify={'space-between'}>
              <div></div>
              <Button loading={loading} type="submit" mt="lg" bg="#2951dc" c="#fff">
                Submit
              </Button>
            </Flex>
          </Box>
        </LoadingForm>
      </Box>
    </motion.div>
  );
};

export { GeneratePlanForm };
