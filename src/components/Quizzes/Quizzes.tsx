import { Grid, Box, Flex, rem, Button, Text } from '@mantine/core';
import { useQuery } from 'react-query';
import { Loader } from '../Loader';
import { QuizService } from '@/services/quiz.service';
import { QuizzesCard } from './QuizzesCard';
import { IconRefresh } from '@tabler/icons-react';
import { Container } from '../Container/Container';

const quizservice = new QuizService();
const getQuizzes = () => {
  return quizservice.getQuizzes();
};

export const Quizzes = () => {
  const { data, isLoading, error, refetch } = useQuery<
    {
      topic: string;
      id: number;
      grade_level: string;
      quiz_qas: { id: number; question: string; answer: string }[];
    }[]
  >({
    queryKey: 'quiz',
    queryFn: getQuizzes,
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
              <Grid.Col key={item.id} maw={'100%'} span={4}>
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
