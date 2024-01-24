import { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton, Flex } from '@mantine/core';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ avatar, username, firstName, lastName, email, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={avatar} radius="xl" />

        <div style={{ flex: 1 }}>
          <Flex>
            <Text size="sm" fw={500}>
              {firstName} {lastName}
            </Text>
          </Flex>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        <IconChevronRight size="1rem" />
      </Group>
    </UnstyledButton>
  )
);
