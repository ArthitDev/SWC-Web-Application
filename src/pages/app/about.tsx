import dynamic from 'next/dynamic';
import React from 'react';

const DynamicAboutPage = dynamic(
  () => import('components/app/about/AboutPage')
);

const AboutPage: React.FC = () => {
  return <DynamicAboutPage />;
};

export default AboutPage;
