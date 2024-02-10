import { UserButton } from '@/components/Container/UserButton';
import { ROUTES } from '@/constants/routes.enum';
import { IS_MOBILE } from '@/helpers/common.helper';
import { useMobxStore } from '@/lib/mobx/store-provider';
import { AuthService } from '@/services/auth.service';
import { IUser } from '@/types/user';
import { AppShell, Box, Button, Flex, Image, Menu, rem, Skeleton, Text } from '@mantine/core';
import {
  IconArrowRight,
  IconDashboard,
  IconLayoutDashboard,
  IconLogout,
  IconUser,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const authservice = new AuthService();

export function HomePage() {
  const navigate = useNavigate();
  const { user: userStore } = useMobxStore();
  const [user, setUser] = useState<null | IUser>();
  // const [user, setUser] =
  useEffect(() => {
    userStore.fetchCurrentUser().then((res) => setUser(res));
  }, []);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = document.querySelector('canvas');
    const c: CanvasRenderingContext2D | null = canvas?.getContext('2d')!;
    if(!canvas || !c) return
    interface Mouse {
      x: number | undefined;
      y: number | undefined;
    }

    const mouse: Mouse = {
      x: undefined,
      y: undefined,
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function getRandomColor(): string {
      const colorArray: string[] = ['#616ee6', '#67b1e0', '#62aaf3', '#F06060'];
      return colorArray[Math.floor(Math.random() * colorArray.length)];
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      const xBorderProximity: boolean = e.x <= 5 || e.x >= canvas.width - 5;
      const yBorderProximity: boolean = e.y <= 5 || e.y >= canvas.height - 5;

      if (!(xBorderProximity || yBorderProximity)) {
        mouse.x = e.x;
        mouse.y = e.y;
      } else {
        mouse.x = undefined;
        mouse.y = undefined;
      }
    });

    class Circle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      color: string;

      constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
        this.x = x || 50;
        this.y = y || 50;
        this.dx = dx || 5;
        this.dy = dy || 5;
        this.radius = radius || 15;
        this.color = color || 'blue';
      }

      draw(): void {
        if(!c) return
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0);
        c.fillStyle = this.color;
        c.fill();
      }

      update(): void {
        this.dx = this.x > innerWidth - this.radius || this.x < this.radius ? -this.dx : this.dx;
        this.x += this.dx;

        this.dy = this.y > innerHeight - this.radius || this.y < this.radius ? -this.dy : this.dy;
        this.y += this.dy;

        const proximity: number = 30;
        const xNearby: boolean = mouse.x - this.x < proximity && mouse.x - this.x > -proximity;
        const yNearby: boolean = mouse.y - this.y < proximity && mouse.y - this.y > -proximity;

        if (xNearby && yNearby && this.radius < 20) {
          this.radius += 1;
        } else if (this.radius > this.radius) {
          this.radius -= 1;
        }

        this.draw();
      }
    }

    let circleQuantity: number = 30;
    const circleMinSize: number = 4;
    const circleMaxSize: number = 20;
    let circleArray: Circle[] = [];

    function init(): void {
      circleArray = [];

      for (let i = 0; i < circleQuantity; i++) {
        const radius: number =
          circleMinSize - 1 + (circleMaxSize - circleMinSize) * Math.random()
        const x: number = Math.random() * (innerWidth - radius * 2) + radius;
        const y: number = Math.random() * (innerHeight - radius * 2) + radius;
        const dx: number = (Math.random() - 0.5) * 5;
        const dy: number = (Math.random() - 0.5) * 5;
        const color: string = getRandomColor();

        circleArray[i] = new Circle(x, y, dx, dy, radius, color);
        circleArray[i].draw();
      }
    }
    init();

    function animate(): void {
      if(!c) return
      c.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <Box>
      <AppShell transitionDuration={500} transitionTimingFunction="ease" header={{ height: 80 }}>
        <AppShell.Header
          style={{
            boxShadow: '0px 0px 3px #bababa',
            borderRadius: '0px 0px 8px 8px',
            zIndex: 102,
          }}
          px={'xl'}
          py="sm"
        >
          <Flex gap={'lg'} align={'center'} justify={'space-between'} px={40}>
            <Image
              src={'../../assets/logo-2.svg'}
              alt="Syllabus scribe"
              fit="contain"
              height={55}
              style={{
                cursor: 'pointer',
              }}
            />

            {!IS_MOBILE && userStore.currentUser && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UserButton
                    username={userStore.currentUser?.username}
                    avatar={userStore.currentUser?.username}
                    email={userStore.currentUser?.username}
                    firstName={userStore.currentUser?.username}
                    lastName={userStore.currentUser?.username}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => navigate(ROUTES.EDUCATIONAL_GARAGE)}
                    leftSection={
                      <IconLayoutDashboard style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    App
                  </Menu.Item>
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
            {!userStore.currentUser && (
              <Button
                color="#2951DC"
                w={140}
                onClick={() => navigate('/register')}
                variant="outline"
                radius={50}
              >
                Register
              </Button>
            )}
          </Flex>
        </AppShell.Header>
        <AppShell.Main>
          <Box px={50}>
            <Flex align={'center'} justify={'space-between'} gap={130}>
              <Box
                style={{
                  top: '0',
                  left: '0',
                  backdropFilter: 'blur(18px)',
                  borderRadius: '20px',
                  width: '100%',
                  display: 'flex',
                  height: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Text
                    component="h1"
                    ff={'heading'}
                    fz={rem(53)}
                    fw={700}
                    style={{
                      lineHeight: 1.2,
                    }}
                    mb={4}
                  >
                    Welcome to
                  </Text>
                  <div className="typewriter">
                    <Text
                      component="h1"
                      ff={'heading'}
                      fz={rem(53)}
                      fw={700}
                      style={{
                        lineHeight: 1.2,
                      }}
                      mb={4}
                    >
                      Syllabus
                      <span
                        style={{
                          color: '#2951DC',
                        }}
                      >
                        Scribe
                      </span>
                    </Text>
                  </div>

                  <Text maw={rem(500)} size="sm" ff="text" c={'var(--mantine-color-gray-6)'}>
                    comprehensive educational platform designed to simplify content creation for
                    instructors across a diverse range of education topics!
                  </Text>

                  <Button
                    bg={'#2951DC'}
                    style={{ fontSize: '12px' }}
                    radius={40}
                    mt={40}
                    w={250}
                    rightSection={<IconArrowRight />}
                    h={50}
                  >
                    Let's Get Started
                  </Button>
                </Box>
                <Image
                  src="../../assets/hero.svg"
                  style={{
                    zIndex: 12,
                    right: 0,
                    borderRadius: '8px',
                  }}
                  fit="contain"
                />
              </Box>

              <canvas
                style={{
                  maxHeight: 'calc(100% - 200px)',
                  position: 'absolute',
                  width:'calc(100% - 100px)',
                  zIndex: -1,
                }}
              ></canvas>
            </Flex>
          </Box>
        </AppShell.Main>
      </AppShell>
    </Box>
  );
}
