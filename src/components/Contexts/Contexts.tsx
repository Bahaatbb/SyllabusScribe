import { Grid, Box } from '@mantine/core';
import { useQuery } from 'react-query';
import { ContextCard } from './ContextCard';
import { Loader } from '../Loader';
import { ContextService } from '@/services/context.service';

const contextservice = new ContextService();
const getContexts = () => {
  return contextservice.getContexts();
};

export const Contexts = () => {
  const { data, isLoading, error } = useQuery<
    { topic: string; id: number; content: string; grade_level: string }[]
  >({
    queryKey: 'context',
    queryFn: getContexts,
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
                <ContextCard
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
