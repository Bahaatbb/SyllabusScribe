import { Container, EducationCard, Loader } from '@/components';
import { ROUTES } from '@/constants/routes.enum';
import { Grid } from '@mantine/core';
import {
  IconAffiliate,
  IconBooks,
  IconCheckupList,
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
              description="The Lesson Planner simplifies lesson planning for educators, minimizing inputs and effortlessly generating detailed plans for each class or session. Tailored to save valuable time, it automates the creation of well-organized lesson plans."
              icon={<IconBooks width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.LESSON_PLANNER}
              linkText="Plan Your Lesson"
            />
          </Grid.Col>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Presentation Generator"
              description="The Presentation Generator simplifies presentation creation for tutors, producing comprehensive slides with minimal effort. It saves valuable time by automating the generation of well-structured presentations, empowering tutors to craft engaging slides effortlessly."
              icon={<IconPresentation width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.PRESENTATION_GENERATOR}
              linkText="Generate Your Presentation"
            />
          </Grid.Col>

          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Context Builder"
              description="The Context Builder enhances the learning experience for tutors and students by effortlessly creating foundational contexts for specific topics and grade levels. It equips tutors with a powerful tool to ensure that students grasp essential keywords and concepts effectively."
              icon={<IconAffiliate width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.CONTEXT_BUILDER}
              linkText={'Build Your Context'}
            />
          </Grid.Col>

          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Handouts"
              description="This feature empowers tutors to efficiently generate thought-provoking questions and their corresponding answers, aligning seamlessly with the lesson's educational objectives."
              icon={<IconFileTypePpt width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.WORKSHEETS}
              linkText="Create Your Handout"
            />
          </Grid.Col>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Quiz Builder"
              description="The Quiz Generator simplifies quiz creation for educators by generating customized quizzes on specific topics and grade levels, minimizing their effort while providing comprehensive sets of Multiple-Choice Questions (MCQs) with correct answers and options."
              icon={<IconNotes width={30} height={30} color="#5085c6" />}
              link={ROUTES.EDUCATIONAL_GARAGE + ROUTES.QUIZ_BUILDER}
              linkText="Build Your Quiz"
            />
          </Grid.Col>
          <Grid.Col maw={450} span={4}>
            <EducationCard
              title="Student performance evaluation"
              description="The Student Performance Model utilizes inputs from tutors about individual students, including academic history, engagement levels, and other relevant metrics. By analyzing this data, the model generates a predicted Performance Index, providing valuable insights into the expected academic outcomes of the student."
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
