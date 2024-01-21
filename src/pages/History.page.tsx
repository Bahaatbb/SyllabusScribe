import {
  Container,
  LessonContexts,
  LessonPlans,
  Presentations,
  LessonQuizzes,
  LessonWorksheets,
} from '@/components';
import { motion } from 'framer-motion';
import { Tabs, rem } from '@mantine/core';
import { StyledTabs } from '@/components/shared/StyledTabs';
import {
  IconBooks,
  IconPresentation,
  IconAffiliate,
  IconFileTypePpt,
  IconFileAnalytics,
  IconNotes,
} from '@tabler/icons-react';

const History = () => {
  return (
    <motion.div>
      <Container title="History">
        <StyledTabs defaultValue="plans">
          <Tabs.List grow>
            <Tabs.Tab
              value="plans"
              leftSection={<IconBooks style={{ width: rem(20), height: rem(20) }} />}
            >
              Plans
            </Tabs.Tab>
            <Tabs.Tab
              value="presentations"
              leftSection={<IconPresentation style={{ width: rem(20), height: rem(20) }} />}
            >
              Presentations
            </Tabs.Tab>
            <Tabs.Tab
              value="contexts"
              leftSection={<IconAffiliate style={{ width: rem(20), height: rem(20) }} />}
            >
              Contexts
            </Tabs.Tab>
            <Tabs.Tab
              value="worksheets"
              leftSection={<IconFileTypePpt style={{ width: rem(20), height: rem(20) }} />}
            >
              Worksheets
            </Tabs.Tab>
            <Tabs.Tab
              value="quizzes"
              leftSection={<IconNotes style={{ width: rem(20), height: rem(20) }} />}
            >
              Quizzes
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="plans">
            <LessonPlans />
          </Tabs.Panel>
          <Tabs.Panel value="presentations">
            <Presentations />
          </Tabs.Panel>
          <Tabs.Panel value="contexts">
            <LessonContexts />
          </Tabs.Panel>
          <Tabs.Panel value="worksheets">
            <LessonWorksheets />
          </Tabs.Panel>
        
          <Tabs.Panel value="quizzes">
            <LessonQuizzes />
          </Tabs.Panel>
        </StyledTabs>
      </Container>
    </motion.div>
  );
};

export { History };
