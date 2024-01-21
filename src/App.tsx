import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './app.css'

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { NavigationProgress } from '@mantine/nprogress';
import { ModalsProvider } from '@mantine/modals';
import { MobxStoreProvider } from './lib/mobx/store-provider';
import MobxStoreInit from './lib/mobx/store-init';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient()

export default function App() {
  return (
    <MobxStoreProvider>
      <MobxStoreInit />
      <MantineProvider theme={theme}>
        <Notifications />
        <NavigationProgress />
        <ModalsProvider>
          <QueryClientProvider client={queryClient} >
            <Router />
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </MobxStoreProvider>
  );
}
