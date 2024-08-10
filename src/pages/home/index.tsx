import dynamic from 'next/dynamic';
import React from 'react';

const DynamicHomepage = dynamic(() => import('components/home/Hoempage'));

const Homepage: React.FC = () => {
  return <DynamicHomepage />;
};

export default Homepage;
