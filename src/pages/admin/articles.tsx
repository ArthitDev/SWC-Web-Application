import dynamic from 'next/dynamic';
import React from 'react';

const DynamicArticlePanel = dynamic(
  () => import('components/admin/ArticlePanel/ArticlePanel')
);

const ArticlesPage: React.FC = () => {
  return <DynamicArticlePanel />;
};

export default ArticlesPage;
