import { Container, Loader } from '@/components';
import { PlanService } from '@/services/plan.service';
import { Box, Divider, Flex, Text } from '@mantine/core';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom';

const planservice = new PlanService();

export const Lesson = () => {
  const { id } = useParams();
  const { data, isLoading, error, status } = useQuery<
    {
      lesson_plan: { content: string; topic: string; id: number; grade_level: string };
    },
    {
      error: { error: string };
    }
  >('one-plan', {
    queryFn: () => planservice.getOnePlan(id || ''),
    enabled: !!id,
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
      <Container title="Lesson" has_parent>
        <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
          <Text>{error.error + '' || 'Something Went wrong'}</Text>
        </Flex>
      </Container>
    );
  }
  // TODO: Fix the style on those

  return (
    <Container title={data?.lesson_plan.topic!} has_parent>
      <Text fw={600} my="lg">
       This Lesson is intended for: {data?.lesson_plan.grade_level} Students
      </Text>
      <Divider />
      <Flex mt={'lg'} align={'center'} justify={'center'} direction={'column'}>
        <Box style={{}}>
          {data?.lesson_plan.content.split('\n').map((item, index) => (
            <Text key={index} lh={2}>
              {item}
            </Text>
          ))}
        </Box>
      </Flex>
    </Container>
  );
};
