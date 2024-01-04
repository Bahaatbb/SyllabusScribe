import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { NavigationProgress } from '@mantine/nprogress';
import { ModalsProvider } from '@mantine/modals';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <NavigationProgress />
      <ModalsProvider>
        <Router />
      </ModalsProvider>
    </MantineProvider>
  );
}
