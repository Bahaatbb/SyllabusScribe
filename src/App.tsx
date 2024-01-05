import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { NavigationProgress } from '@mantine/nprogress';
import { ModalsProvider } from '@mantine/modals';
import { MobxStoreProvider } from './lib/mobx/store-provider';
import MobxStoreInit from './lib/mobx/store-init';

export default function App() {
  return (
    <MobxStoreProvider>
      <MobxStoreInit />
      <MantineProvider theme={theme}>
        <NavigationProgress />
        <ModalsProvider>
          <Router />
        </ModalsProvider>
      </MantineProvider>
    </MobxStoreProvider>
  );
}
