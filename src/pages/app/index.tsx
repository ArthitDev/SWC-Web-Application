import dynamic from 'next/dynamic';
import React from 'react';

const DynamicMainPage = dynamic(() => import('components/app/home/MainPage'));

const Homeapp: React.FC = () => {
  return <DynamicMainPage />;
};

export default Homeapp;
