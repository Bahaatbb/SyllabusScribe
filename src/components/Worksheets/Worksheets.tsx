import { Grid, Box, Flex, Button, rem, Text } from '@mantine/core';
import { useQuery } from 'react-query';
import { WorksheetsCard } from './WorksheetsCard';
import { Loader } from '../Loader';
import { WorksheetsService } from '@/services/worksheet.service';
import { IconRefresh } from '@tabler/icons-react';
import { Container } from '../Container/Container';

const worksheetsservice = new WorksheetsService();
const getworksheets = () => {
  return worksheetsservice.getWorksheets();
};

export const Worksheets = () => {
  const { data, isLoading, error, refetch } = useQuery<
    { topic: string; id: number; content: string; grade_level: string }[]
  >({
    queryKey: 'worksheet',
    queryFn: getworksheets,
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
    <Box
      style={{
        padding: '24px 0px',
      }}
    >
      {isLoading ? (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Grid grow>
          {data &&
            data.map((item) => (
              <Grid.Col key={item.id} maw={'100%'} span={3}>
                <WorksheetsCard
                  id={item.id}
                  key={item.id}
                  topic={item.topic}
                  content={item.content}
                  grade_level={item.grade_level}
                />
              </Grid.Col>
            ))}
        </Grid>
      )}
    </Box>
  );
};
