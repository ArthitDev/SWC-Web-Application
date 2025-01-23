import dynamic from 'next/dynamic';
import React from 'react';

const DynamicArticlePage = dynamic(
  () => import('components/app/article/ArticlePage')
);

const ArticlePage: React.FC = () => {
  return <DynamicArticlePage />;
};

export default ArticlePage;
