import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import ArticleDetail from 'components/app/article/ArticleDetail';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import { getArticleById } from '@/services/articleService';
import FetchError from '@/utils/FetchError';

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: article,
    isLoading,
    error,
  } = useQuery(['articles', id], () => getArticleById(id as string), {
    enabled: !!id,
  });

  if (!id) return null;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <FetchError />;
  }

  return (
    <ArticleDetail id={id as string} article_video={article?.article_video} />
  );
};

export default ArticleDetailPage;
