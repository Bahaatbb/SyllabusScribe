import React from 'react';
import { Box, Button, Card, Divider, Flex, Text, TextInput, Textarea, rem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useCreateUnit } from '@/hooks/useCreateUnit';

const schema = z.object({
  name: z.string().min(1, 'Please enter a name'),
  description: z.string().nullable(),
});

export const StepTwoForm = ({ subject }: { subject: number }) => {
  const { loading, createUnit } = useCreateUnit();

  const form = useForm<{ name: string; description: string }>({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      description: '',
    },

    validateInputOnBlur: true,
  });

  type FormValues = typeof form.values;
  const handleFormSubmit = async (values: FormValues) => {
    let payload = { ...values, subject };
    createUnit(payload, {
      onSuccess: (data) => {
        form.reset();
        close();
      },
    });
  };

  return (
    <Card
      component="form"
      radius="md"
      style={{
        display: 'flex',
        gap: rem(40),
      }}
      onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
    >
      <div>
        <Text fz={rem(20)} fw={'bold'}>
          Create Unit
        </Text>
        <Divider mt="lg" />
      </div>

      <Box>
        <TextInput
          label="name"
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          error={form.errors.name}
          style={{ marginBottom: '16px' }}
          disabled={loading}
        />

        <Textarea
          label="Description"
          minRows={4}
          value={form.values.description}
          onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
          error={form.errors.description}
        />
      </Box>
      <Button loading={loading} type="submit" h={rem(40)} color="#2951DC">
        Submit
      </Button>
    </Card>
  );
};
