import dynamic from 'next/dynamic';
import React from 'react';

const DynamicTrickPage = dynamic(
  () => import('components/app/trick/TrickPage')
);

const PredictPage: React.FC = () => {
  return <DynamicTrickPage />;
};

export default PredictPage;
