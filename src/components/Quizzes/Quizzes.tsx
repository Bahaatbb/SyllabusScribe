import { PlanService } from '@/services/plan.service';
import { Grid, Box } from '@mantine/core';
import { useQuery } from 'react-query';
import { Loader } from '../Loader';
import { QuizService } from '@/services/quiz.service';
import { QuizzesCard } from './QuizzesCard';

const quizservice = new QuizService();
const getQuizzes = () => {
  return quizservice.getQuizzes();
};

export const Quizzes = () => {
  const { data, isLoading, error } = useQuery<{
      topic: string;
      id: number;
      grade_level: string;
      quiz_qas: { id: number; question: string; answer: string }[];
    }[]
  >({
    queryKey: 'quiz',
    queryFn: getQuizzes,
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
                <QuizzesCard
                  key={item.id}
                  id={item.id}
                  topic={item.topic}
                  grade_level={item.grade_level}
                  quiz_qas={item.quiz_qas}
                />
              </Grid.Col>
            ))}
        </Grid>
      )}
    </Box>
  );
};
