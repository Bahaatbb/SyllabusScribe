import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomePage,
  EducationalGarage,
  History,
  LoginPage,
  RegisterPage,
  PresentationGenerator,
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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
