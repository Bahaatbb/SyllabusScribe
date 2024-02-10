import { ROUTES } from '@/constants/routes.enum';
import { Box, Button, Card, Divider, Flex, Group, Menu, Modal, Text, rem } from '@mantine/core';
import { IconArrowBadgeRightFilled, IconSchool, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Points } from '../points';
import { useDisclosure } from '@mantine/hooks';

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
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: rem(357),
      }}
      shadow="sm"
      withBorder={true}
      p="lg"
      radius="md"
    >
      <Card.Section p="lg">
        <Flex justify={'space-between'}>
          <Box fw={600} ta={'left'} fz={'lg'} w={'100%'}>
            <Flex align={'center'} justify={'space-between'} w={'100%'}>
              <Box
                component="span"
                style={{
                  display: 'block',
                  maxWidth: rem(340),
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {topic}
              </Box>
            </Flex>
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
          </Box>
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
              maxHeight: rem(22),
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
