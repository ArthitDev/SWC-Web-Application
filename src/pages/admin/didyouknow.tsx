import dynamic from 'next/dynamic';
import React from 'react';

const DynamicDidyouknowPanel = dynamic(
  () => import('components/admin/DidyouknowPanel')
);

const DidyouknowPage: React.FC = () => {
  return <DynamicDidyouknowPanel />;
};

export default DidyouknowPage;
