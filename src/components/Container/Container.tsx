import { AppShell, Burger, Group, Skeleton, Flex, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode, useEffect } from 'react';
import { NavMenu } from '../Navigation/NavMenu';
import { rem } from '@mantine/core';
import {
  IconHome,
  IconListDetails,
  IconBook,
  IconHistoryToggle,
  IconUser,
  IconLogout,
} from '@tabler/icons-react';
import { ROUTES } from '@/constants/routes.enum';

export function Container({ children }: { children: ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure();

  const menuItems = [
    {
      icon: <IconBook style={{ width: rem(30), height: rem(40) }} stroke={1.5} />,
      label: 'Unit planner',
      link: '/',
    },

    {
      icon: <IconListDetails style={{ width: rem(30), height: rem(40) }} stroke={1.5} />,
      label: "Teacher's garage",
      link: ROUTES.TEACHER_GARAGE,
    },
    {
      icon: <IconHistoryToggle style={{ width: rem(30), height: rem(40) }} stroke={1.5} />,
      label: "Teacher's work",
      link: ROUTES.TEACHER_WORK,
    },
  ];

  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease"
      header={{ height: 60 }}
      withBorder={true}
      /**
       *  TODO: Change desktop:false when we apply authentication
       */
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header p={'md'}>
        <Flex align={'center'} justify={'space-between'}>
          <Flex align={'center'} justify={'space-between'} gap={'md'}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div>Syllabus Scribe</div>
          </Flex>
          <Flex align={'center'} gap={'xl'} pr={'xl'}>
            <IconUser />
            <IconLogout />
          </Flex>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md" display={'flex'}>
        <Box>
          <NavMenu menuItems={menuItems} />
        </Box>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
