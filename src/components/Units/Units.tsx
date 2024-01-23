import { Grid, Box } from '@mantine/core';
import { useQuery } from 'react-query';
import { LessonCard } from './LessonCard';
import { Loader } from '../Loader';
import { UnitService } from '@/services/unit.service';

const unitplanservice = new UnitService();
const getUnits = () => {
  return unitplanservice.getUnits();
};

export const Units = () => {
  const { data, isLoading, error } = useQuery<
    { topic: string; id: number; content: string; grade_level: string }[]
  >({
    queryKey: 'units',
    queryFn: getUnits,
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
                <LessonCard
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
