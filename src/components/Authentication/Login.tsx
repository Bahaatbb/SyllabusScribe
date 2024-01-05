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
} from '@mantine/core';
import { z } from 'zod';

import { GoogleButton } from './GoogleButton';
import { Link } from 'react-router-dom';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string(),
});

function Login(props: PaperProps) {
  const form = useForm<{ email: string; password: string }>({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },

    validateInputOnBlur: true,
  });

  type FormValues = typeof form.values;

  const handleLogin = (values: FormValues) => {
    
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props} w={'500px'} shadow="0 0 4px #bdbdbd">
      <Text size="xl" fw={500} ta={'center'}>
        Login
      </Text>
      <Group grow mb="md" mt="md">
        <GoogleButton radius={10}>Google</GoogleButton>
        {/* <TwitterButton radius="xl">Twitter</TwitterButton> */}
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@example.com"
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
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component={Link} type="button" c="dimmed" to={'/register'} size="xs">
            Don't have an account? Register
          </Anchor>
          <Button type="submit" radius="xl" color="#2951dc">
            Login
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export { Login };
