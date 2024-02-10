import { Container, Loader } from '@/components';
import { ContextService } from '@/services/context.service';
import { Box, Button, Divider, Flex, Text, Image, rem } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import generatePDF, { Margin, Resolution } from 'react-to-pdf';

const contextservice = new ContextService();
export const Context = () => {
  const { id } = useParams();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error, refetch } = useQuery<
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
      <Container title="Context" has_parent>
        <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
          {/* @ts-ignore */}
          <Text c={'red'}>{error?.error || 'Something Went wrong'}</Text>
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
  // TODO: Fix the style on those
  return (
    <Container title={data?.lesson_context.topic!} has_parent>
      <Flex align={'center'} justify={'space-between'}>
        <Text fw={600} my="lg">
          This{' '}
          <Text component="span" fw={'bold'} c="#2951DC">
            Context
          </Text>{' '}
          is intended for: {data?.lesson_context.grade_level} Students
        </Text>
        <Button
          onClick={() =>
            generatePDF(targetRef, {
              filename: `${data?.lesson_context.topic}-context.pdf`,

              page: {
                // margin is in MM, default is Margin.NONE = 0
                margin: Margin.SMALL,
                // default is 'portrait'
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
      <Flex ref={targetRef} mt={'lg'} align={'center'} justify={'center'} direction={'column'}>
        <Box
          className="w"
          ml="lg"
          style={{
            marginRight: 'auto',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
          }}
        >
          {data?.lesson_context.content.split('\n').map((item, index) => {
            return item
              .split(':')
              .map((t) => t.trim())
              .map((da, index) => {
                if (index % 2 == 0) {
                  return (
                    <Text
                      component="pre"
                      fw={'bold'}
                      style={{
                        whiteSpace: 'pre-wrap',
                      }}
                      key={index}
                    >
                      {da}:
                    </Text>
                  );
                } else {
                  return (
                    <Text
                      component="pre"
                      style={{
                        whiteSpace: 'pre-wrap',
                      }}
                      ml={'lg'}
                      key={index}
                      mb="md"
                    >
                      {da}
                    </Text>
                  );
                }
              });
          })}
        </Box>
        <Divider
          style={{
            alignSelf: 'end',
            width: '100%',
          }}
        />
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
