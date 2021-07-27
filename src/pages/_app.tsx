import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { NotificationProvider } from '@components/contexts/NotificationContext';

import '../../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}

export default MyApp;
