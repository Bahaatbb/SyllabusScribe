import { Container, Loader } from '@/components';
import { WorksheetsService } from '@/services/worksheet.service';
import { Box, Divider, Flex, Text} from '@mantine/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const worksheetservice = new WorksheetsService();
export const Worksheet = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<{
    lesson_handout: { content: string; topic: string; id: number; grade_level: string };
  },
  {
    error: { error: string };
  }>('one-worksheet', {
    queryFn: () => worksheetservice.getOneWorksheet(id || ''),
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
    <Container title={data?.lesson_handout.topic!} has_parent>
      <Text fw={600} my="lg">
        This Worksheet is intended for: {data?.lesson_handout.grade_level} Students
      </Text>
      <Divider />
      <Flex mt={'lg'} align={'center'} justify={'center'} direction={'column'}>
        <Box
          style={{
            width: '80%',
            marginRight: 'auto',
            textAlign: 'left',
          }}
        >
          {data?.lesson_handout.content.split('\n').map((item, index) => (
            <Text key={index} lh={2}>
              {item}
            </Text>
          ))}
        </Box>
      </Flex>
    </Container>
  )
}
