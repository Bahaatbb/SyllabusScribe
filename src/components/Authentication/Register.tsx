import { useForm, zodResolver } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Flex,
  rem,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { IRegsiterData } from '@/types/auth';
import { AuthService } from '@/services/auth.service';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const schema = z
  .object({
    email: z.string().email({ message: 'Invalid email' }),
    first_name: z.string().min(3, 'First name should be at least 3 characters').max(50),
    last_name: z.string().min(3, 'Last name should be at least 3 characters').max(50),
    username: z
      .string()
      .min(3, 'Username should be at least 3 characters')
      .max(50, 'Username should be at most 50 characters'),
    password: z
      .string()
      // should contain at least one number and one special character and one capital letter
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{6,}$/, {
        message:
          'Password should contain at least one number and one special character and one capital letter',
      }),
    // no access to form values
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const authService = new AuthService();

function Register(props: PaperProps) {
  const [error, setError] = useState<null | string>(null);

  const form = useForm<{
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      confirmPassword: '',
    },

    validate: zodResolver(schema),
  });

  type FormValues = typeof form.values;
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: FormValues) => {
    const payload: IRegsiterData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    await authService
      .Register(payload)
      .then(() => {
        navigate('/login');
        form.reset();
      })
      .catch((err) => {
        setError(err?.detail || err?.message || 'An error occurred');
      });
  };
  const controls = useAnimation();

  useEffect(() => {
    // Animate the logo initially
    controls.start({ opacity: 1, y: 0 });

    // Animate the expansion of the login form
    controls.start({
      height: 'auto',
      transition: { duration: 0.5, ease: 'easeInOut' },
    });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }} // Initial logo position
      animate={controls}
      style={{
        width: '100%',
        maxWidth: rem(500),
      }}
    >
      <Paper radius="md" p="xl" withBorder {...props} w="100%" maw={500} shadow="0 0 4px #bdbdbd">
        <Text size="xl" fw={500} ta={'center'}>
          Register
        </Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius={10}>Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          <Stack>
            {error && (
              <Text size="sm" c="red" ta="center">
                {error}
              </Text>
            )}
            <Flex justify={'space-between'} gap="md">
              <TextInput
                w={'100%'}
                label="First name"
                placeholder="first name"
                value={form.values.first_name}
                onChange={(event) => form.setFieldValue('first_name', event.currentTarget.value)}
                error={form.errors.first_name}
                radius="md"
              />

              <TextInput
                w={'100%'}
                label="Last name"
                placeholder="last name"
                value={form.values.last_name}
                onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
                error={form.errors.last_name}
                radius="md"
              />
            </Flex>

            <TextInput
              required
              label="Email"
              placeholder="hello@example.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              radius="md"
            />
            <TextInput
              required
              label="Username"
              placeholder="username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              error={form.errors.username}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password}
              radius="md"
            />

            <PasswordInput
              required
              label="Confirm password"
              placeholder="Confirm password"
              value={form.values.confirmPassword}
              onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
              error={form.errors.confirmPassword}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component={Link} type="button" c="dimmed" to={'/login'} size="xs">
              Already have an account? Login
            </Anchor>
            <Button type="submit" radius="xl" color="#2951dc">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </motion.div>
  );
}

export { Register };
