import '../styles/globals.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import axios from 'axios';
import { AuthProvider } from 'contexts/AuthContext';
import AdminLayout from 'layout/AdminLayout';
import AuthLayout from 'layout/AuthLayout';
import LandingLayout from 'layout/LandingLayout';
import MainLayout from 'layout/MainLayout';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import createEmotionCache from 'theme/createEmotionCache';
import theme from 'theme/theme';

import pageTitles from '../config/pageTitles';

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

axios.defaults.withCredentials = true;

export default function MyApp({ Component, pageProps }: MyAppProps) {
  // const [showModal, setShowModal] = useState(false);
  const emotionCache = clientSideEmotionCache;
  const router = useRouter();

  const getLayoutComponent = () => {
    switch (true) {
      case router.pathname === '/' || router.pathname === '/landing':
        return LandingLayout;
      case router.pathname.startsWith('/app'):
        return MainLayout;
      case router.pathname.startsWith('/admin'):
        return AdminLayout;
      case router.pathname.startsWith('/login') ||
        router.pathname.startsWith('/registeradmin'):
        return AuthLayout;
      default:
        return MainLayout;
    }
  };

  const LayoutComponent = getLayoutComponent();
  const title = pageTitles[router.pathname] || 'SWC Web Application';

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <div>
            <AuthProvider>
              <LayoutComponent>
                <Component {...pageProps} />
                {/* <LandingPageModal
                  open={showModal}
                  title="ยืนยันไปยังหน้าแนะนำ"
                  description="คุณต้องการไปยังหน้าแนะนำอีกครั้งใช่ไหม ?"
                  onConfirm={handleConfirm}
                  onCancel={handleCancel}
                /> */}
              </LayoutComponent>
            </AuthProvider>
            <Toaster />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
