import { Optional } from '@/helpers/common.helper';
import { UserService } from '@/services/user.service';
import { IUser } from '@/types/user';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FileInput,
  Flex,
  Stack,
  TextInput,
  Textarea,
  rem,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { forwardRef, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const userservice = new UserService();
const getUser = () => {
  return userservice.currentUser();
};

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


export const ProfileForm = ({ data }: { data: Optional<IUser, 'avatar'> }) => {
  // const fileInputRef=forwardRef<HTMLButtonElement>s();
  // ForwardedRef<HTMLButtonElement> | undefined
  const form = useForm<{
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    bio: string;
    avatar?: string;
  }>({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      bio: '',
    },

    validate: zodResolver(schema),
  });

  type FormValues = typeof form.values;
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: FormValues) => {};

  useEffect(() => {
    if (data) form.setValues(data);
  }, []);

  return (
    <Box>
      <Flex justify={'center'}>
        <Avatar w={rem(100)} h={rem(100)} src={`http://localhost:8000${data?.avatar}`} />
        <IconPlus
          style={{
            cursor: 'pointer',
          }}
        />
        <FileInput display={'none'}/>
      </Flex>
      <Divider mt="lg" />
      <Stack mt={'lg'} gap={'lg'}>
        <Textarea label="Bio" placeholder="Bio" minRows={4} />

        <Flex justify={'space-between'} gap="lg">
          <TextInput
            w={'100%'}
            label="First name"
            placeholder="first name"
            value={form.values.first_name}
            onChange={(event) => form.setFieldValue('first_name', event.currentTarget.value)}
            error={form.errors.first_name}
            radius="sm"
          />

          <TextInput
            w={'100%'}
            label="Last name"
            placeholder="last name"
            value={form.values.last_name}
            onChange={(event) => form.setFieldValue('last_name', event.currentTarget.value)}
            error={form.errors.last_name}
            radius="sm"
          />
        </Flex>

        <TextInput
          required
          label="Email"
          placeholder="hello@example.dev"
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          error={form.errors.email}
          radius="sm"
        />
        <TextInput
          required
          label="Username"
          placeholder="username"
          value={form.values.username}
          onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
          error={form.errors.username}
          radius="sm"
        />

        <Button type="submit" radius="sm" color="#2951dc">
          Edit Profile
        </Button>
      </Stack>
    </Box>
  );
};
