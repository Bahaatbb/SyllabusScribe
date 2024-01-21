import { PlanService } from '@/services/plan.service';
import { Grid, Box } from '@mantine/core';
import React from 'react';
import { useQuery } from 'react-query';
import { PresentationCard } from '../Presentations';
import { LessonCard } from './LessonCard';
import { Loader } from '../Loader';

const planservice = new PlanService();
const getPlans = () => {
  return planservice.getPlans();
};

export const Plans = () => {
  const { data, isLoading, error } = useQuery<
    { topic: string; id: number; content: string; grade_level: string }[]
  >({
    queryKey: 'plans',
    queryFn: getPlans,
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
