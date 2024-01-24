import { ReactNode, useState } from 'react';
import { AppShell, Burger, Flex, Box, Image, Text, Skeleton, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import {
  IconListDetails,
  IconBook,
  IconHistoryToggle,
  IconUser,
  IconLogout,
  IconArrowLeft,
} from '@tabler/icons-react';
import { rem } from '@mantine/core';

// src
import { NavMenu } from '../Navigation/NavMenu';
import { ROUTES } from '@/constants/routes.enum';
import { IS_MOBILE } from '@/helpers/common.helper';
import { UserButton } from './UserButton';
import { IUser } from '@/types/user';
import { useQuery } from 'react-query';
import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';

const userservice = new UserService();
const authservice = new AuthService();
const getUser = () => {
  return userservice.currentUser();
};
export function Container({
  children,
  has_parent,
  title,
}: {
  children: ReactNode;
  has_parent?: boolean;
  title: string;
}) {
  const [opened, { toggle, close }] = useDisclosure();
  const navigate = useNavigate();
  const [user, setUser] = useState<null | IUser>(null);

  const { data, isLoading, error } = useQuery<IUser>({
    queryKey: 'user',
    queryFn: getUser,
  });

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

  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease"
      header={{ height: 80 }}
      withBorder={true}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: false, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header
        style={{
          borderBottom: '3px solid #5479ff',
          boxShadow: '0px 0px 3px #bababa',
          borderRadius: '0px 0px 8px 8px',
          zIndex: 102,
        }}
        px={'xl'}
        py="sm"
      >
        <Flex direction={'column'}>
          <Flex align={'center'} justify={'space-between'}>
            <Flex align={'center'} justify={'space-between'} gap={80}>
              <Flex align={'center'} justify={'space-between'}>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Image
                  src={'../../assets/logo-2.svg'}
                  alt="Syllabus scribe"
                  fit="contain"
                  height={55}
                />
              </Flex>
              <Flex gap={15} align={'center'} justify={'space-between'}>
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
                {title && !IS_MOBILE && (
                  <Text
                    style={{
                      fontWeight: 700,
                      fontSize: '20px',
                      lineHeight: '24px',
                    }}
                  >
                    {title}
                  </Text>
                )}
              </Flex>
            </Flex>
            {isLoading && (
              <Flex direction={'row'} align={'center'} w={200} gap={15}>
                <Skeleton height={40} circle />
                <Flex direction={'column'} gap={'md'} justify={'center'}>
                  <Skeleton height={8} width={100} radius="xl" />
                  <Skeleton height={8} width={130} radius="xl" />
                </Flex>
              </Flex>
            )}
            {!IS_MOBILE && data && !isLoading && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UserButton
                    username={data.username}
                    avatar={data.avatar}
                    email={data.email}
                    firstName={data.first_name}
                    lastName={data.last_name}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => navigate(ROUTES.PROFILE)}
                    leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                    onClick={() => authservice.signOut()}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
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
