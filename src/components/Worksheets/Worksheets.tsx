import { Grid, Box } from '@mantine/core';
import { useQuery } from 'react-query';
import { WorksheetsCard } from './WorksheetsCard';
import { Loader } from '../Loader';
import { WorksheetsService } from '@/services/worksheet.service';

const worksheetsservice = new WorksheetsService();
const getworksheets = () => {
  return worksheetsservice.getWorksheets();
};

export const Worksheets = () => {
  const { data, isLoading, error } = useQuery<
    { topic: string; id: number; content: string; grade_level: string }[]
  >({
    queryKey: 'worksheet',
    queryFn: getworksheets,
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
