import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ReactElement } from 'react';

import { NotificationProvider } from '@components/contexts/NotificationContext';
import { fetcher } from '@utils/axios';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <NotificationProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </NotificationProvider>
  );
}

export default MyApp;
