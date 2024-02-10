import { Container, Loader } from '@/components';
import { QuizService } from '@/services/quiz.service';
import { Box, Button, Card, Divider, Flex, Text, Image, rem } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import generatePDF, { Margin } from 'react-to-pdf';

const quizservice = new QuizService();
export const Quiz = () => {
  const { id } = useParams();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error,refetch } = useQuery<
    {
      lesson_quiz: {
        grade_level: string;
        topic: string;
        id: number;
        quiz_qas: {
          id: number;
          question: string;
          answer: string;
        }[];
      };
    },
    {
      error: { error: string };
    }
  >('one-quiz', {
    queryFn: () => quizservice.getOneQuiz(id || ''),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <Container title="Lesson" has_parent>
        <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
          <Loader />
        </Flex>
      </Container>
    );
  }

  if (error) {
    return (
      <Container title="Quiz" has_parent>
        <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
          <Text>{error.error + '' || 'Something Went wrong'}</Text>
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
      </Container>
    );
  }

  return (
    <Container title={data?.lesson_quiz.topic!} has_parent>
      <Flex align={'center'} justify={'space-between'}>
        <Text fw={600} my="lg">
          This{' '}
          <Text component="span" fw={'bold'} c="#2951DC">
            Quiz
          </Text>{' '}
          is intended for: {data?.lesson_quiz.grade_level} Students
        </Text>
        {/* TODO: Make it download as a PDF */}
        <Button
          onClick={() =>
            generatePDF(targetRef, {
              filename: `${data?.lesson_quiz.topic}-quizz.pdf`,
              page: {
                margin: Margin.SMALL,
                orientation: 'landscape',
              },
            })
          }
          bg="#2951dc"
          c="#fff"
        >
          Download as PDF
        </Button>
      </Flex>
      <Divider />
      <Flex
        ref={targetRef}
        ml="lg"
        mr="lg"
        mt={'lg'}
        justify={'center'}
        direction={'column'}
        gap={'lg'}
      >
        {data?.lesson_quiz.quiz_qas.reverse().map((q, index) => (
          <Card radius={'md'} key={q.id} shadow="sm" withBorder>
            <Card.Section p="lg">
              <Text fw={600} fz={'lg'} ta={'left'}>
                Question {index + 1}
              </Text>
              <Divider my="lg" />
              <Box ta={'left'} fz={'lg'}>
                {q.question.split('\n').map((q, i) => (
                  <Text
                    c={i === 0 ? '#d4a703' : ''}
                    lh={2}
                    mb={i === 0 ? 14 : 0}
                    key={i}
                    fw={i === 0 ? 600 : 400}
                  >
                    {q}
                  </Text>
                ))}
              </Box>
              <Divider my="lg" />
              <Text fw={600} fz={'lg'} ta={'left'}>
                Answer:
              </Text>
              <Box mt={14}>
                <Text ta={'left'} fz={'md'}>
                  {q.answer}
                </Text>
              </Box>
            </Card.Section>
          </Card>
        ))}
        <Flex
          align={'center'}
          justify={'center'}
          style={{
            width: '100%',
          }}
        >
          <div></div>

          <Image
            src={'../../assets/logo-2.svg'}
            alt="Syllabus scribe"
            pos={'relative'}
            mt="lg"
            mr="md"
            style={{
              alignSelf: 'end',
              width: '200px',
              right: '0',
              cursor: 'pointer',
            }}
          />
        </Flex>
      </Flex>
    </Container>
  );
};
