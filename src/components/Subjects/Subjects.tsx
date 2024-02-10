import { ROUTES } from '@/constants/routes.enum';
import { SubjectService } from '@/services/subject.service';
import { Card, Text, Flex, Grid, Button, rem, Divider, Box, Menu, Modal } from '@mantine/core';
import { IconArrowBadgeRightFilled, IconRefresh, IconX } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Points } from '../points';
import { useDisclosure } from '@mantine/hooks';

const subjectservice = new SubjectService();
const getSubject = () => {
  return subjectservice.getSubjects();
};

export const Subjects = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading, error, refetch } = useQuery<
    {
      id: number;
      name: string;
    }[]
  >({
    queryKey: 'subject',
    queryFn: getSubject,
  });

  if (error) {
    return (
      <>
        <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
          {/* @ts-ignore */}
          <Text c={'red'}>{error?.error || error?.detail || 'Something Went wrong'}</Text>
          <Button
            w={rem(200)}
            mt={rem(25)}
            rightSection={<IconRefresh />}
            color="#7b7b7b"
            radius={'lg'}
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Grid grow>
      {data &&
        data.map((item, index) => (
          <Grid.Col key={item.id} span={4}>
            <Card withBorder>
              <Flex align={'center'} justify={'space-between'} w={'100%'}>
                <Box
                  component="span"
                  style={{
                    display: 'block',
                    maxWidth: rem(300),
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                </Box>
              </Flex>
              <Divider mt={rem(25)} />
              <Button
                component={Link}
                to={ROUTES.SYLLABUS_SCRIBER + ROUTES.UNIT_PLANNER + `/${item.id}`}
                replace={false}
                mt={rem(25)}
                rightSection={<IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />}
                color="#2951DC"
                radius={'lg'}
              >
                View Units
              </Button>
            </Card>
          </Grid.Col>
        ))}
    </Grid>
  );
};
