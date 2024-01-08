import { Container, EducationCard, Loader } from '@/components';
import { ROUTES } from '@/constants/routes.enum';
import { Badge, Box, Button, Card, Flex, Grid, Group, Image, Spoiler, Text } from '@mantine/core';
import {
  IconAffiliate,
  IconArrowBadgeRight,
  IconArrowBearRight2,
  IconArrowRight,
  IconBooks,
  IconFileAnalytics,
  IconFileTypePpt,
  IconPresentation,
  IconTextCaption,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const EducationalGarage = () => {
  return (
    <motion.main>
      <Container>
        <Grid grow>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Lesson Planner"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconBooks width={30} height={30} color="#5085c6" />}
              link="/lesson-planner"
              linkText="Generate Your Lesson"
            />
          </Grid.Col>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Presentation Generator"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconPresentation width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.PRESENTATION_GENERATOR}
              linkText="Generate Your Presentation"
            />
          </Grid.Col>

          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Context Builder"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconAffiliate width={30} height={30} color="#5085c6" />}
              link="/presentation-generator"
              linkText="Generate Your Context"
            />
          </Grid.Col>

          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Worksheets"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconFileTypePpt width={30} height={30} color="#5085c6" />}
              link="/presentation-generator"
              linkText="Generate Your Presentation"
            />
          </Grid.Col>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Unit planner"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconFileAnalytics width={30} height={30} color="#5085c6" />}
              link="/presentation-generator"
              linkText="Generate Your Presentation"
            />
          </Grid.Col>
        </Grid>
      </Container>
    </motion.main>
  );
};

export { EducationalGarage };
