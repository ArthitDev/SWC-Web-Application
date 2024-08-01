import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import createEmotionCache from 'theme/createEmotionCache';
import theme from 'theme/theme';

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const emotionCache = clientSideEmotionCache;
  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>SWC Web Application</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
