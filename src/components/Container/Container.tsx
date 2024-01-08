import { AppShell, Burger, Flex, Box, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import { NavMenu } from '../Navigation/NavMenu';
import { rem } from '@mantine/core';
import {
  IconListDetails,
  IconBook,
  IconHistoryToggle,
  IconUser,
  IconLogout,
  IconArrowLeft,
} from '@tabler/icons-react';
import { ROUTES } from '@/constants/routes.enum';
import { useNavigate } from 'react-router-dom';

export function Container({ children, has_parent }: { children: ReactNode; has_parent?: boolean }) {
  const [opened, { toggle, close }] = useDisclosure();
  /**
   *  TODO: MOVE THIS TO A HELPER
   **/
  const userAgent = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const menuItems = [
    {
      icon: <IconBook style={{ width: rem(30), height: rem(40) }} stroke={1.5} />,
      label: 'Syllabus Scriber',
      link: ROUTES.HOME,
    },

    {
      icon: <IconListDetails style={{ width: rem(30), height: rem(40) }} stroke={1.5} />,
      label: 'Educational garage',
      link: ROUTES.EDUCATIONAL_GARAGE,
    },
    {
      icon: <IconHistoryToggle style={{ width: rem(30), height: rem(40) }} stroke={1.5} />,
      label: 'History',
      link: ROUTES.HISTORY,
    },
  ];

  const navigate = useNavigate();
  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease"
      header={{ height: 80 }}
      withBorder={true}
      /**
       *  TODO: Change desktop:false when we apply authentication
       **/
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header px={'xl'} py="sm">
        <Flex align={'center'} justify={'space-between'}>
          <Flex align={'center'} justify={'space-between'} w={280}>
            <Flex align={'center'} justify={'space-between'} gap={'md'}>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Image
                src={'../../assets/logo-2.svg'}
                alt="Syllabus scribe"
                fit="contain"
                height={55}
              />
            </Flex>
            {has_parent && (
              <Box
                component="button"
                onClick={() => navigate(-1)}
                bg="#f4f4f4"
                px={6}
                pt={6}
                style={{
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: '0 0 4px rgb(234, 234, 234)',
                  cursor: 'pointer',
                }}
              >
                <IconArrowLeft width={'24px'} height={'24px'} />
              </Box>
            )}
          </Flex>
          {!isMobile && (
            <Flex align={'center'} gap={'xl'} pr={'xl'}>
              <IconUser />
              <IconLogout />
            </Flex>
          )}
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
