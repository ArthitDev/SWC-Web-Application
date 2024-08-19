import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const DynamicLandingPage = dynamic(() => import('components/landing/Landing'));

const LandingPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedLandingPage');

    if (hasVisited) {
      router.push('/app');
    } else {
      localStorage.setItem('hasVisitedLandingPage', 'false');
    }
  }, [router]);

  return <DynamicLandingPage />;
};

export default LandingPage;
