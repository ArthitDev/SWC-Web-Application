import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import AdminLayout from 'layout/AdminLayout';
import AuthLayout from 'layout/AuthLayout';
import MainLayout from 'layout/MainLayout';
import { AppProps } from 'next/app';
import { Prompt } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Bounce, ToastContainer } from 'react-toastify';
import createEmotionCache from 'theme/createEmotionCache';
import theme from 'theme/theme';

import pageTitles from '../config/pageTitles';

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

const prompt = Prompt({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

axios.defaults.withCredentials = true;

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const emotionCache = clientSideEmotionCache;
  const router = useRouter();

  const getLayoutComponent = () => {
    if (router.pathname.startsWith('/admin')) {
      return AdminLayout;
    }
    if (
      router.pathname.startsWith('/login') ||
      router.pathname.startsWith('/registeradmin')
    ) {
      return AuthLayout;
    }
    return MainLayout;
  };

  const LayoutComponent = getLayoutComponent();
  const title = pageTitles[router.pathname] || 'SWC Web Application';

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <div className={prompt.className}>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Bounce}
            />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
