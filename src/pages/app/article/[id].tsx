import ArticleDetail from 'components/app/article/ArticleDetail';
import { useRouter } from 'next/router';
import React from 'react';

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return <ArticleDetail id={id as string} />;
};

export default ArticleDetailPage;
