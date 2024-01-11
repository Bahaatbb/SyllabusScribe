import { NumberInput, TextInput, NativeSelect, rem, Flex, Button, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconSchool } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { useGeneratePresentation } from '@/hooks/useGeneratePresentation';
import { LoadingForm } from '../LoadingForm';
import { useEffect } from 'react';

const schema = z.object({
  num_slides: z
    .number({ invalid_type_error: 'Please enter a number' })
    .min(1, 'Number should be greater than 0')
    .max(10, 'Number should be less than or equal to 10'),
  topic: z.string().min(1, 'Please enter a topic'),
  grade_level: z.string().min(1, 'Please enter a grade level'),
});

const GeneratePresentationForm = () => {
  const { data, error, loading, generatePresentation, isSuccess } = useGeneratePresentation();

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  const form = useForm<{ num_slides: number; topic: string; grade_level: string }>({
    validate: zodResolver(schema),
    initialValues: {
      num_slides: 1,
      topic: '',
      grade_level: 'Elementary school',
    },

    validateInputOnBlur: true,
  });

  type FormValues = typeof form.values;

  const handleFormSubmit = async (values: FormValues) => {
    notifications.show({
      title: 'Generating presentation',
      message: 'Please wait while we generate your presentation',
      loading: true,
    });

    generatePresentation(values);
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to generate presentation',
        color: 'red',
      });
    }
    // prevent the form from submitting
    if (isSuccess) {
      notifications.show({
        title: 'Success',
        message: 'Presentation generated successfully',
        color: 'green',
      });
      /**
       * TODO: Fix when the response returns the intended data filename:"la;ds" 
       **/
      console.log(data)
      window.open(`http://localhost:8000/media/${data.model_output.file_path}`);
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
            <NumberInput
              label="Number of Slides"
              placeholder="Input placeholder"
              max={10}
              min={1}
              defaultValue={1}
              style={{ marginBottom: '16px' }}
              value={form.values.num_slides}
              onChange={(value) => form.setFieldValue('num_slides', Number(value))}
              error={form.errors.num_slides}
              disabled={loading}
            />
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

export { GeneratePresentationForm };
