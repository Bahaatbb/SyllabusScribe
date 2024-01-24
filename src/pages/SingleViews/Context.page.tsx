import { Container, Loader } from '@/components';
import { ContextService } from '@/services/context.service';
import { Box, Divider, Flex, Text } from '@mantine/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const contextservice = new ContextService();
export const Context = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<
    {
      lesson_context: { content: string; topic: string; id: number; grade_level: string };
    },
    {
      error: { error: string };
    }
  >('one-context', {
    queryFn: () => contextservice.getOneContext(id || ''),
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
    <Container title={data?.lesson_context.topic!} has_parent>
      <Text fw={600} my="lg">
        This Context is intended for: {data?.lesson_context.grade_level} Students
      </Text>
      <Divider />
      <Flex mt={'lg'} align={'center'} justify={'center'} direction={'column'}>
        <Box
          style={{
            width: '80%',
            marginRight: 'auto',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
          }}
        >
          {data?.lesson_context.content.split('\n').map((item, index) => (
            <Text
              key={index}
              lh={2}
              style={{
                wordSpacing: '3px',
              }}
            >
              {item}
            </Text>
          ))}
        </Box>
      </Flex>
    </Container>
  );
};