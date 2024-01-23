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
  UnitPlanner,
  WorksheetsCreator,
  StudentPerformanceModel,
} from './pages';
import { ROUTES } from './constants/routes.enum';


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.CONTEXT_BUILDER,
    element: <ContextBuilder />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.UNIT_PLANNER,
    element: <UnitPlanner />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.WORKSHEETS,
    element: <WorksheetsCreator />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.QUIZ_BUILDER,
    element: <QuizBuilder />,
  },
  {
    path: ROUTES.EDUCATIONAL_GARAGE + ROUTES.STUDENT_PERFORMANCE,
    element: <StudentPerformanceModel/>

  }

]);

export function Router() {
  return <RouterProvider router={router} />;
}
