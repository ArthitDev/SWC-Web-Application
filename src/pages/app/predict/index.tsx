import dynamic from 'next/dynamic';
import React from 'react';

const DynamicPredictPage = dynamic(
  () => import('components/app/predict/PredictPage')
);

const PredictPage: React.FC = () => {
  return <DynamicPredictPage />;
};

export default PredictPage;
