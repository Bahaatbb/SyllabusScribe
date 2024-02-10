import { ROUTES } from '@/constants/routes.enum';
import { Badge, Box, Button, Card, Divider, Flex, Group, Menu, Modal, Spoiler, Text, rem } from '@mantine/core';
import { IconArrowBadgeRightFilled, IconEye, IconSchool, IconX } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Points } from '../points';
import { useDisclosure } from '@mantine/hooks';

export const WorksheetsCard = ({
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
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        minHeight:rem(357)

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
                  maxWidth: rem(300),
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
      <Card.Section p="lg">
        <Box
          fz="sm"
          style={{
            display: 'block',
            maxHeight: rem(200),
            minWidth: rem(300),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
          }}
        >
          {content.split('\n').map((line, index) => (
            <Text key={index}>{line}</Text>
          ))}
        </Box>
      </Card.Section>
      <Button
        rightSection={<IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />}
        bg="#2951dc"
        radius={10}
        onClick={() => navigate(`${ROUTES.EDUCATIONAL_GARAGE}${ROUTES.WORKSHEETS}/${id}`)}
      >
        Show more
      </Button>
    </Card>
  );
};
