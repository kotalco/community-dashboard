import Head from 'next/head';
import { ReactElement } from 'react';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { fetcher } from '@utils/axios';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SWRConfig value={{ fetcher }}>
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/logo.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
