import { Container, Loader } from '@/components';
import { WorksheetsService } from '@/services/worksheet.service';
import { Box, Button, Divider, Flex, Text, Image, rem } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import generatePDF, { Margin } from 'react-to-pdf';

const worksheetservice = new WorksheetsService();
export const Worksheet = () => {
  const { id } = useParams();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error, refetch } = useQuery<
    {
      lesson_handout: { content: string; topic: string; id: number; grade_level: string };
    },
    {
      error: { error: string };
    }
  >('one-worksheet', {
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
      <Container title="Handout" has_parent>
        <Flex align={'center'} justify={'center'} direction={'column'} w={'100%'} h={600}>
          {/* @ts-ignore */}
          <Text>{error?.error || 'Something Went wrong'}</Text>
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
    <Container title={data?.lesson_handout.topic!} has_parent>
      <Flex align={'center'} justify={'space-between'}>
        <Text fw={600} my="lg">
          This{' '}
          <Text component="span" fw={'bold'} c="#2951DC">
            Handout
          </Text>{' '}
          is intended for: {data?.lesson_handout.grade_level} Students
        </Text>
        <Button
          onClick={() =>
            generatePDF(targetRef, {
              filename: `${data?.lesson_handout.topic}-Handout.pdf`,
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
      <Flex ref={targetRef} mt={'lg'} align={'center'} justify={'center'} direction={'column'}>
        <Box
          ml="lg"
          className="w"
          style={{
            marginRight: 'auto',
            textAlign: 'left',
          }}
        >
          {data?.lesson_handout.content.split('\n').map((item, index) => {
            if (item.startsWith('I') || item.startsWith('V')) {
              return (
                <Text
                  component="pre"
                  style={{
                    whiteSpace: 'pre-wrap',
                  }}
                  mt={'lg'}
                  fw={'bolder'}
                  key={index}
                  lh={2}
                >
                  {item}
                </Text>
              );
            } else {
              return (
                <Text
                  component="pre"
                  style={{
                    whiteSpace: 'pre-wrap',
                  }}
                  ml="md"
                  key={index}
                  lh={2}
                >
                  {item}
                </Text>
              );
            }
          })}
        </Box>
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
