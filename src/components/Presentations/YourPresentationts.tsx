import { Box, Grid } from '@mantine/core';
import { PresentationCard } from './PresentationCard';
import { Loader } from '../Loader';
import { useQuery } from 'react-query';
import { PresentationService } from '@/services/presentation.service';

const presentationservice = new PresentationService();
const generatePresentation = () => {
  return presentationservice.getPresentations();
};
const YourPresentationts = () => {
  const { data, isLoading, error } = useQuery<
    { topic: string; id: number; generated_file: string; grade_level: string }[]
  >({
    queryKey: 'presentations',
    queryFn: generatePresentation,
  });
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
              <Grid.Col maw={'100%'} span={3}>
                <PresentationCard key={item.id} text={item.topic} link={item.generated_file} />
              </Grid.Col>
            ))}
        </Grid>
      )}
    </Box>
  );
};

export { YourPresentationts };
