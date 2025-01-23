import dynamic from 'next/dynamic';
import React from 'react';

const DynamicDidyouknowPage = dynamic(
  () => import('components/app/didyouknow/DidyouknowPage')
);

const PredictPage: React.FC = () => {
  return <DynamicDidyouknowPage />;
};

export default PredictPage;
