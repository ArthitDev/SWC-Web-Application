import dynamic from 'next/dynamic';
import React from 'react';

const DynamicWoundPage = dynamic(
  () => import('components/app/wound/WoundPage')
);

const WoundPage: React.FC = () => {
  return <DynamicWoundPage />;
};

export default WoundPage;
