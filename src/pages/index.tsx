import type { NextPage } from 'next';

// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
import LandingPage from './landing';

const MainPage: NextPage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const hasVisited = localStorage.getItem('hasVisited');
  //   if (hasVisited) {
  //     router.push('/home');
  //   } else {
  //     localStorage.setItem('hasVisited', 'true');
  //   }
  // }, [router]);

  return <LandingPage />;
};

export default MainPage;
