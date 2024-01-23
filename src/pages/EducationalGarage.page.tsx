import { Container, EducationCard, Loader } from '@/components';
import { ROUTES } from '@/constants/routes.enum';
import { Grid } from '@mantine/core';
import {
  IconAffiliate,
  IconBooks,
  IconCheckupList,
  IconFileAnalytics,
  IconFileTypePpt,
  IconNotes,
  IconPresentation,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';

const EducationalGarage = () => {
  return (
    <motion.main>
      <Container title="Educational Garage">
        <Grid grow>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Lesson Planner"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconBooks width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.LESSON_PLANNER}
              linkText="Plan Your Lesson"
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
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.CONTEXT_BUILDER}
              linkText={'Build Your Context'}
            />
          </Grid.Col>

          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Worksheets"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconFileTypePpt width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.WORKSHEETS}
              linkText="Create Your Worksheet"
            />
          </Grid.Col>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Quiz Builder"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconNotes width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.QUIZ_BUILDER}
              linkText="Build Your Quiz"
            />
          </Grid.Col>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Student performance evaluation"
              description="This tool generates you slides that help you empower your work. With a tool like this one you would move fast with your teaching process."
              icon={<IconCheckupList width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.STUDENT_PERFORMANCE}
              linkText="See how your students perofrm"
            />
          </Grid.Col>
        </Grid>
      </Container>
    </motion.main>
  );
};

export { EducationalGarage };
