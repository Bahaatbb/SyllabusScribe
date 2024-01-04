import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, TeacherGarage, TeacherWork } from './pages';
import { ROUTES } from './constants/routes.enum';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: ROUTES.TEACHER_GARAGE,
    element: <TeacherGarage />,
  },
  {
    path: ROUTES.TEACHER_WORK,
    element: <TeacherWork />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
