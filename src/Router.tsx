import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomePage,
  EducationalGarage,
  History,
  LoginPage,
  RegisterPage,
  PresentationGenerator,
  ContextBuilder,
  LessonPlanner,
  QuizBuilder,
  WorksheetsCreator,
  StudentPerformanceModel,
  Context,
  Lesson,
  Quiz,
  Worksheet,
  Unit,
  SyllabusScriber,
  Profile
} from './pages';
import { ROUTES } from './constants/routes.enum';
import { NotFound } from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path:ROUTES.SYLLABUS_SCRIBER,
    element: <SyllabusScriber />
  },
  {
    path: ROUTES.SYLLABUS_SCRIBER + ROUTES.UNIT_PLANNER + '/:id',
    element: <Unit />
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE,
    element: <EducationalGarage />,
  },
  {
    path: ROUTES.HISTORY,
    element: <History />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.PRESENTATION_GENERATOR,
    element: <PresentationGenerator />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.LESSON_PLANNER,
    element: <LessonPlanner />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.LESSON_PLANNER + '/:id',
    element: <Lesson />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.CONTEXT_BUILDER,
    element: <ContextBuilder />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.CONTEXT_BUILDER + '/:id',
    element: <Context />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.WORKSHEETS,
    element: <WorksheetsCreator />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.WORKSHEETS + '/:id',
    element: <Worksheet />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.QUIZ_BUILDER,
    element: <QuizBuilder />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.QUIZ_BUILDER + '/:id',
    element: <Quiz />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.STUDENT_PERFORMANCE,
    element: <StudentPerformanceModel/>
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
