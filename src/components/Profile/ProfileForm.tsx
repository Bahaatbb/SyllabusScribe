import { Optional } from '@/helpers/common.helper';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
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
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  first_name: z.string().min(1, 'First name should be at least 3 characters').max(50),
  last_name: z.string().min(1, 'Last name should be at least 3 characters').max(50),
  username: z
    .string()
    .min(1, 'Username should be at least 3 characters')
    .max(50, 'Username should be at most 50 characters'),
});

export const ProfileForm = ({
  data,
}: {
  data: Optional<IUser, 'avatar'>;
}) => {
  const fileInputRef = useRef<HTMLButtonElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (files: File | null) => {
    const file = files ?? null;
    console.log(file);
    setAvatarFile(file);
  };

  const { loading, updateUser } = useUpdateProfile();
  const form = useForm<{
    email: string;
    first_name: string;
    last_name: string;
    username: string;
    bio: string;
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

  const handleFormSubmit = (formData: FormValues) => {
    const payload = new FormData(); // Use FormData to handle file upload
    payload.append('email', formData.email);
    payload.append('username', formData.username);
    payload.append('first_name', formData.first_name);
    payload.append('last_name', formData.last_name);
    if (avatarFile) {
      payload.append('avatar', avatarFile);
    }
    updateUser(payload, {
      onSuccess() {
        notifications.show({
          title: 'Success',
          message: 'Profile was updated successfully',
          color: 'green',
        });
      },
    });
  };

  useEffect(() => {
    if (data) form.setValues(data);
  }, []);

  return (
    <Box>
      <Flex justify={'center'}>
        <Avatar w={rem(100)} h={rem(100)} src={`${import.meta.env.VITE_API_URL}/${data?.avatar}`} />
        <IconPlus
          onClick={handleIconClick}
          style={{
            cursor: 'pointer',
          }}
        />
        <FileInput
          style={{ display: 'none' }} // Ensure this is styled to be hidden
          onChange={handleFileChange}
          accept="image/*" // Optional: Restrict to image files
          ref={fileInputRef}
        />
      </Flex>
      <Divider mt="lg" />
      <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
        <Stack mt={'lg'} gap={'lg'}>
          <Textarea
            label="Bio"
            placeholder="Bio"
            minRows={4}
            value={form.values.bio}
            onChange={(event) => form.setFieldValue('bio', event.currentTarget.value)}
            error={form.errors.bio}
          />

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

          <Button loading={loading} type="submit" radius="sm" color="#2951dc">
            Edit Profile
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
