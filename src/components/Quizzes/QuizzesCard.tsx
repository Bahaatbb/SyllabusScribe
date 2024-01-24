import { ROUTES } from '@/constants/routes.enum';
import { Box, Button, Card, Divider, Flex, Group, Text, rem } from '@mantine/core';
import { IconArrowBadgeRightFilled, IconSchool } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const QuizzesCard = ({
  topic,
  grade_level,
  quiz_qas,
  id,
}: {
  id: number;
  topic: string;
  grade_level: string;
  quiz_qas: { id: number; question: string; answer: string }[];
}) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      shadow="sm"
      withBorder={true}
      p="lg"
      radius="md"
    >
      <Card.Section p="lg">
        <Flex justify={'space-between'}>
          <Text fw={600} ta={'left'} fz={'lg'}>
            <Box
              component="span"
              style={{
                display: 'block',
                maxWidth: rem(500),
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {topic}
            </Box>
            <Flex gap={8} align={'center'}>
              <IconSchool
                color="#5085c6"
                style={{
                  width: rem(16),
                  height: rem(16),
                }}
              />
              <Text fz="xs" c="">
                {grade_level.charAt(0).toUpperCase() + grade_level.slice(1)}
              </Text>
            </Flex>
          </Text>
        </Flex>
      </Card.Section>
      <Divider />
      <Card.Section
        style={{
          display: 'block',
          maxWidth: rem(600),
          overflow: 'hidden',
        }}
        p="lg"
      >
        <Group gap={10}>
          <Text fw={600}>Question:</Text>
          <Box
            style={{
              boxSizing: 'border-box',
              maxHeight: rem(20),
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'clip',
            }}
          >
            {quiz_qas[0].question.split('\n').map((line, index) => (
              <Text key={index}>{line}</Text>
            ))}
          </Box>
        </Group>
        <Divider mt="xs" w={'80%'} />
        <Group mt="sm" gap={10}>
          <Text fw={600}>Answers:</Text>
          <Box mah={rem(55)} style={{ overflow: 'hidden' }}>
            {quiz_qas[0].answer.split('\n').map((line, index) => (
              <Text key={index}>{line}</Text>
            ))}
          </Box>
        </Group>
      </Card.Section>
      <Button
        rightSection={<IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />}
        bg="#2951dc"
        radius={10}
        onClick={() => navigate(`${ROUTES.EDUCATIONAL_GARAGE}${ROUTES.QUIZ_BUILDER}/${id}`)}
      >
        Show more
      </Button>
    </Card>
  );
};
