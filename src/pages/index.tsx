import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

import Landing from './Landing';

const HomePage: NextPage = () => {
  useEffect(() => {
    const adminTest = false;
    if (adminTest) {
      Router.push('/Homepage');
    }
  }, []);

  return (
    <>
      <Landing />
    </>
  );
};

export default HomePage;
