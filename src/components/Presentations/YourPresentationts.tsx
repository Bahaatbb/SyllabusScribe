import { Box, Card, Grid, rem, Text } from '@mantine/core';
import { IconDownload, IconFileTypePpt, IconPresentation } from '@tabler/icons-react';
import React from 'react';

const YourPresentationts = () => {
  return (
    <Box
      style={{
        padding: '24px',
      }}
    >
      <Grid grow>
        <Grid.Col maw={rem(300)} span={3}>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            shadow="sm"
            withBorder={true}
            p="lg"
            radius="md"
          >
            <IconPresentation color="#f3b200" size={30} />
            <Text fw={500} ta={'center'} fz={'sm'}>
              Compiler Design
            </Text>
            <IconDownload
              style={{
                cursor: 'pointer',
              }}
              size={30}
              color="#2951dc"
            />
          </Card>
        </Grid.Col>

        <Grid.Col maw={rem(300)} span={3}>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            shadow="sm"
            withBorder={true}
            p="lg"
            radius="md"
          >
            <IconPresentation color="#f3b200" size={30} />
            <Text fw={500} ta={'center'} fz={'sm'}>
              Neural Network
            </Text>
            <IconDownload
              style={{
                cursor: 'pointer',
              }}
              size={30}
              color="#2951dc"
            />
          </Card>
        </Grid.Col>


        <Grid.Col maw={rem(300)} span={3}>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            shadow="sm"
            withBorder={true}
            p="lg"
            radius="md"
          >
            <IconPresentation color="#f3b200" size={30} />
            <Text fw={500} ta={'center'} fz={'sm'}>
              Intro to calculus
            </Text>
            <IconDownload
              style={{
                cursor: 'pointer',
              }}
              size={30}
              color="#2951dc"
            />
          </Card>
        </Grid.Col>


        <Grid.Col maw={rem(300)} span={3}>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            shadow="sm"
            withBorder={true}
            p="lg"
            radius="md"
          >
            <IconPresentation color="#f3b200" size={30} />
            <Text fw={500} ta={'center'} fz={'sm'}>
              Data Science
            </Text>
            <IconDownload
              style={{
                cursor: 'pointer',
              }}
              size={30}
              color="#2951dc"
            />
          </Card>
        </Grid.Col>

        <Grid.Col maw={rem(300)} span={3}>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            shadow="sm"
            withBorder={true}
            p="lg"
            radius="md"
          >
            <IconPresentation color="#f3b200" size={30} />
            <Text fw={500} ta={'center'} fz={'sm'}>
              EEC
            </Text>
            <IconDownload
              style={{
                cursor: 'pointer',
              }}
              size={30}
              color="#2951dc"
            />
          </Card>
        </Grid.Col>

      </Grid>
    </Box>
  );
};

export default YourPresentationts;
