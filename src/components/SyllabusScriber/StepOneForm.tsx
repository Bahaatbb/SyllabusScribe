import React from 'react';
import { Button, Card, Divider, Flex, Text, TextInput, rem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { useCreateSubject } from '@/hooks/useCreateSubject';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes.enum';

const schema = z.object({
  name: z.string().min(1, 'Please enter a Subject name'),
});

export const StepOneForm = () => {
  const isMobile = useMediaQuery('(max-width: 50em)');

  const navigate = useNavigate();
  const { loading, createSubject } = useCreateSubject();

  const form = useForm<{ name: string }>({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
    },

    validateInputOnBlur: true,
  });

  type FormValues = typeof form.values;
  const handleFormSubmit = async (values: FormValues) => {
    createSubject(values, {
      onSuccess: (data) => {
        // @ts-ignore
        navigate(ROUTES.SYLLABUS_SCRIBER + ROUTES.UNIT_PLANNER + `/${data?.id}`);
      },
    });
  };

  return (
    <Flex justify={'center'} align={'center'} direction={'column'} mt={rem(100)}>
      <Card
        component="form"
        shadow="sm"
        radius="md"
        withBorder
        className="education-card"
        padding={rem(40)}
        style={{
          display: 'flex',
          gap: rem(40),
        }}
        onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
      >
        <div>
          {/* <Card.Section p='lg'> */}
          <Text fz={rem(20)} fw={'bold'}>
            Create Subject
          </Text>
          {/* </Card.Section> */}
          <Divider mt="lg" />
        </div>

        <TextInput
          label="Subject"
          w={!isMobile ? rem(600) : '100%'}
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          error={form.errors.name}
          style={{ marginBottom: '16px' }}
          // disabled={loading}
        />

        <Button loading={loading} type="submit" h={rem(40)} color="#2951DC">
          Create
        </Button>
      </Card>
    </Flex>
  );
};
