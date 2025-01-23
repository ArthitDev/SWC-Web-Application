import dynamic from 'next/dynamic';
import React from 'react';

const DynamicPredictResultPage = dynamic(
  () => import('components/app/predict/PredictResult')
);

const PredictResult: React.FC = () => {
  return <DynamicPredictResultPage />;
};

export default PredictResult;
