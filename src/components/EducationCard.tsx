import { Card, Flex, Box, Group, Spoiler, Button, Text } from '@mantine/core';
import { IconFileTypePpt, IconArrowBadgeRight, IconArrowBadgeRightFilled } from '@tabler/icons-react';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IEducationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}
const EducationCard = (
  { icon, title, description, link, linkText }: IEducationCardProps,
) => {
  return (
    <Card 
    shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder px={'lg'} pt="xs">
        <Flex align={'center'}>
          <Box mr="xs">
            {icon}
          </Box>
          <Group mb="lg" justify="space-between" mt="md">
            <Text fw={500}>
              {title}
            </Text>
          </Group>
        </Flex>
      </Card.Section>
      <Card.Section p="lg">
        <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
          <Text size="sm" c="dimmed">
           {description}
          </Text>
        </Spoiler>
      </Card.Section>
      <Button
        component={Link}
        to={link}
        replace={false}
        color="#2951dc"
        fullWidth
        mt="md"
        radius={10}
      >
        <Box>{linkText}</Box>
        <IconArrowBadgeRightFilled style={{color: '#f0b206'}} />
      </Button>
    </Card>
  );
};

export {EducationCard};
