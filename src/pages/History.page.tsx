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
  IconNotes,
  IconListNumbers,
} from '@tabler/icons-react';
import { LessonSubjects } from '@/components/History';

const History = () => {
  return (
    <motion.div>
      <Container title="History">
        <StyledTabs defaultValue="subjects">
          <Tabs.List grow>
          <Tabs.Tab
              value="subjects"
              leftSection={<IconListNumbers style={{ width: rem(20), height: rem(20) }} />}
            >
              Subjects
            </Tabs.Tab>
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
              Handouts
            </Tabs.Tab>
            <Tabs.Tab
              value="quizzes"
              leftSection={<IconNotes style={{ width: rem(20), height: rem(20) }} />}
            >
              Quizzes
            </Tabs.Tab>
          
          </Tabs.List>
          <Tabs.Panel value="subjects">
            <LessonSubjects />
          </Tabs.Panel>
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
