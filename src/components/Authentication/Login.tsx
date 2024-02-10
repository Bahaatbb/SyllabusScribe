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
  rem,
} from '@mantine/core';
import { z } from 'zod';

import { Link, useNavigate } from 'react-router-dom';
import { ILoginInData } from '@/types/auth';
import { AuthService } from '@/services/auth.service';
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ROUTES } from '@/constants/routes.enum';

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

const authService = new AuthService();

function Login(props: PaperProps) {
  const [error, setError] = useState<null | string>(null);
  const form = useForm<{ username: string; password: string }>({
    validate: zodResolver(schema),
    initialValues: {
      username: '',
      password: '',
    },

    validateInputOnBlur: true,
    onValuesChange(values) {
      setError(null);
    },
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
      .then((res) => {
        navigate(ROUTES.EDUCATIONAL_GARAGE);
        form.reset();
      })
      .catch((err) => {
        setError(err?.detail);
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
          Login
        </Text>

        <Divider label="Or continue with us" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(async (v) => {
            await handleFormSubmit(v);
          })}
        >
          <Stack>
            {error && (
              <Text size="sm" c="red" ta="center">
                {error}
              </Text>
            )}
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
    </motion.div>
  );
}

export { Login };
