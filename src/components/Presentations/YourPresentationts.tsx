import { Box, Button, Flex, Grid, rem, Text } from '@mantine/core';
import { PresentationCard } from './PresentationCard';
import { Loader } from '../Loader';
import { useQuery } from 'react-query';
import { PresentationService } from '@/services/presentation.service';
import { IconRefresh } from '@tabler/icons-react';
import { Container } from '../Container/Container';

const presentationservice = new PresentationService();
const generatePresentation = () => {
  return presentationservice.getPresentations();
};
const YourPresentationts = () => {
  const { data, isLoading, error, refetch } = useQuery<
    { topic: string; id: number; generated_file: string; grade_level: string }[]
  >({
    queryKey: 'presentations',
    queryFn: generatePresentation,
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
                <PresentationCard key={item.id} text={item.topic} link={item.generated_file} />
              </Grid.Col>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export { YourPresentationts };
