import { Badge, Box, Button, Card, Divider, Flex, Group, Spoiler, Text, rem } from '@mantine/core';
import { IconArrowBadgeRightFilled, IconEye, IconSchool } from '@tabler/icons-react';
import React from 'react';

export const ContextCard = ({
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
      <Card.Section p="lg">
        <Text
          fz="sm"
          style={{
            display: 'block',
            maxHeight: rem(200),
            width: rem(600),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
          }}
        >
          {content}
        </Text>
      </Card.Section>
      <Button
        rightSection={<IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />}
        bg="#2951dc"
        radius={10}
      >
        Show more
      </Button>
    </Card>
  );
};
