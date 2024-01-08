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
import { Link, redirect, useNavigate } from 'react-router-dom';
import { ILoginInData } from '@/types/auth';
import { AuthService } from '@/services/auth.service';

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

const authService = new AuthService();

function Login(props: PaperProps) {
  const form = useForm<{ username: string; password: string }>({
    validate: zodResolver(schema),
    initialValues: {
      username: '',
      password: '',
    },

    validateInputOnBlur: true,
  });

  type FormValues = typeof form.values;
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: FormValues) => {
    const payload: ILoginInData = {
      username: formData.username,
      password: formData.password,
    };

    await authService
      .Login(payload)
      .then(() => {
        navigate('/');
        form.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props} w={'500px'} shadow="0 0 4px #bdbdbd">
      <Text size="xl" fw={500} ta={'center'}>
        Login
      </Text>
      <Group grow mb="md" mt="md">
        <GoogleButton radius={10}>Google</GoogleButton>
      </Group>

      <Divider label="Or continue with us" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(async (v) => {
          await handleFormSubmit(v);
        })}
      >
        <Stack>
          <TextInput
            required
            label="Username"
            placeholder="example"
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
