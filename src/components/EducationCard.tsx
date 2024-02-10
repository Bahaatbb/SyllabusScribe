import { Card, Flex, Box, Group, Button, Text } from '@mantine/core';
import {
  IconArrowBadgeRightFilled,
} from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IEducationCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}
const EducationCard = ({ icon, title, description, link, linkText }: IEducationCardProps) => {
  return (
    <Card style={{minHeight: '320px', display:'flex', justifyContent:'space-between' }} className="education-card" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder px={'lg'} pt="xs">
        <Flex align={'center'}>
          <Box mr="xs">{icon}</Box>
          <Group mb="lg" justify="space-between" mt="md">
            <Text fw={500}>{title}</Text>
          </Group>
        </Flex>
      </Card.Section>
      <Card.Section p="lg">
        <Text size="sm" c="dimmed">
          {description}
        </Text>
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
        <IconArrowBadgeRightFilled style={{ color: '#f0b206' }} />
      </Button>
    </Card>
  );
};

export { EducationCard };
