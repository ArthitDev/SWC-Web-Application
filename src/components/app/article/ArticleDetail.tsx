import { Box, CircularProgress, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import parse from 'html-react-parser';
import React from 'react';
import { useQuery } from 'react-query';
import { getArticleById, getArticleImageUrl } from 'services/articleService';
import BackButtonPage from 'utils/BackButtonPage';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

interface ArticleDetailProps {
  id: string;
}

interface QueryError {
  message: string;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ id }) => {
  useRefetchWebSocket('article', 'UPDATE_ARTICLE');
  const {
    data: article,
    isLoading,
    error,
  } = useQuery(['article', id], () => getArticleById(id), {
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });

  // Sanitize the HTML content from article_content
  const safeContent = article?.article_content
    ? DOMPurify.sanitize(article.article_content)
    : '';

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariants}
      transition={fadeInTransition}
    >
      <BackButtonPage label={article?.article_name || 'Back'} />

      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          padding={2}
        >
          <Typography color="error">
            Error: {(error as QueryError).message}
          </Typography>
        </Box>
      )}

      {!isLoading && !error && article && (
        <Box
          sx={{
            padding: 2,
            margin: '0 auto',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <Box sx={{ marginBottom: 2 }}>
            {article.updated_at && (
              <Typography variant="body2" color="text.secondary">
                {new Date(article.updated_at).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            )}
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              {article.article_name}
            </Typography>
          </Box>
          {article.article_cover && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <img
                src={getArticleImageUrl(article.article_cover)}
                alt={article.article_name}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover', // เปลี่ยนจาก 'contain' เป็น 'cover' เพื่อให้เหมือนกับ WoundDetail
                  borderRadius: '8px',
                }}
              />
            </Box>
          )}
          {article.article_content && (
            <Box className="article-content">{parse(safeContent)}</Box>
          )}
        </Box>
      )}
    </motion.div>
  );
};

export default ArticleDetail;
