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
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email({ message: 'Invalid email' }),
    first_name: z.string(),
    last_name: z.string(),
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
function Register(props: PaperProps) {
  const form = useForm<{
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirmPassword: string;
  }>({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: '',
    },

    validate: zodResolver(schema),
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props} w={'500px'} shadow="0 0 4px #bdbdbd">
      <Text size="xl" fw={500} ta={'center'}>
        Register
      </Text>
      {/* <Text size="sm" fw={300}>
        Welcome to Syllabus Scribe
      </Text> */}
      <Group grow mb="md" mt="md">
        <GoogleButton radius={10}>Google</GoogleButton>
        {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form>
        <Stack>
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
  );
}

export { Register };
