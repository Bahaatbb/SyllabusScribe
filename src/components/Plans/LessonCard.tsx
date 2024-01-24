import { ROUTES } from '@/constants/routes.enum';
import { Box, Button, Card, Divider, Flex, Text, rem } from '@mantine/core';
import { IconArrowBadgeRightFilled, IconSchool } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const LessonCard = ({
  content,
  topic,
  grade_level,
  id,
}: {
  id: number;
  content: string;
  topic: string;
  grade_level: string;
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
                maxWidth: rem(300),
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
      <Card.Section p="lg">
        <Box
          fz="sm"
          style={{
            display: 'block',
            maxHeight: rem(200),
            minWidth: rem(300),
            maxWidth: rem(600),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
          }}
        >
          {content.split('\n').map((text) => (
            <Text>{text}</Text>
          ))}
        </Box>
      </Card.Section>
      <Button
        rightSection={<IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />}
        bg="#2951dc"
        radius={10}
        onClick={() =>
          navigate(`${ROUTES.EDUCATIONAL_GARAGE}${ROUTES.LESSON_PLANNER}/${id}`, {
            relative: 'path',
          })
        }
      >
        Show more
      </Button>
    </Card>
  );
};
