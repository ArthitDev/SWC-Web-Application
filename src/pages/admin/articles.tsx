import dynamic from 'next/dynamic';
import React from 'react';

const DynamicArticlesPanel = dynamic(
  () => import('components/admin/ArticlesPanel')
);

const ArticlesPage: React.FC = () => {
  return <DynamicArticlesPanel />;
};

export default ArticlesPage;
