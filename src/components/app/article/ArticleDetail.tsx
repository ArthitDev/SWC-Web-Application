/* eslint-disable camelcase */
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import BackButtonPage from 'components/button/BackButtonPage';
import DOMPurify from 'dompurify';
import { motion } from 'framer-motion';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import parse from 'html-react-parser';
import React from 'react';
import { useQuery } from 'react-query';
import { getArticleById, getArticleImageUrl } from 'services/articleService';
import COLORS from 'themes/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';
import ScrollToTop from 'utils/ScrollToTop';

import ArticleTag from '@/components/app/article/ArticleTag';
import VideoPlayer from '@/components/input/VideoPlayer';
import DataNotFound from '@/utils/DataNotFound';

interface ArticleVideo {
  value: string;
}

interface ArticleDetailProps {
  id: string;
  article_video: ArticleVideo[];
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ id, article_video }) => {
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

  let parsedRefs = [];
  if (article?.ref) {
    if (Array.isArray(article.ref)) {
      parsedRefs = article.ref;
    } else {
      parsedRefs = JSON.parse(article.ref);
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariants}
      transition={fadeInTransition}
    >
      <BackButtonPage label={article?.article_name || 'กลับ'} />

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
          padding={2}
        >
          <DataNotFound />
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
              <Box
                sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}
              >
                <AccessTimeIcon
                  sx={{
                    fontSize: 16,
                    marginRight: 0.5,
                    color: 'text.secondary',
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontWeight: 400,
                  }}
                >
                  {(() => {
                    const date = new Date(article.updated_at);
                    const datePart = date
                      .toLocaleString('th-TH', {
                        timeZone: 'Asia/Bangkok',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                      .replace(/(\d+) (...) (\d+)/, (_, d, m, y) => {
                        const thaiYear = parseInt(y, 10) + 543;
                        return `${d} ${m}. ${thaiYear}`;
                      });
                    const timePart = date.toLocaleString('th-TH', {
                      timeZone: 'Asia/Bangkok',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    });
                    return `${datePart} (${timePart}) - วันที่และเวลาอัพเดทข้อมูล`;
                  })()}
                </Typography>
              </Box>
            )}
            <Typography
              variant="h5"
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
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            </Box>
          )}
          {article.article_content && (
            <Box className="article-content" sx={{ marginBottom: 2 }}>
              {parse(safeContent)}
            </Box>
          )}
          <Box pt={2}>
            {article.article_note && (
              <Box
                sx={{
                  marginBottom: 2,
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    width: '5px',
                    backgroundColor: COLORS.blue[6],
                    marginRight: 2,
                    flexShrink: 0,
                    height: 'auto',
                    alignSelf: 'stretch',
                  }}
                />
                <Typography variant="body1" color="text.secondary">
                  {article.article_note}
                </Typography>
              </Box>
            )}
          </Box>
          <Box pt={2}>
            {article_video && article_video.length > 0 && (
              <Box sx={{ padding: 2 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  textAlign="center"
                  fontWeight="bold"
                  pb={1}
                >
                  วีดีโอประกอบบทความ
                </Typography>
                {article_video.map((video: ArticleVideo, index: number) => (
                  <Box key={index} sx={{ marginBottom: 3 }}>
                    <VideoPlayer url={video.value} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Box pb={2}>
            <ArticleTag />
          </Box>
          <Box pt={2}>
            {parsedRefs.length > 0 && (
              <Box
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(58,156,253,1) 0%, rgba(35,90,219,1) 100%)',
                  borderRadius: 2,
                  padding: 3,
                  marginBottom: 3,
                  color: 'white',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  แหล่งอ้างอิง
                </Typography>
                {parsedRefs.map((refItem: { value: string }, index: number) => (
                  <Link
                    key={index}
                    href={refItem.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    sx={{
                      display: 'block',
                      wordBreak: 'break-all',
                      marginBottom: 2,
                    }}
                  >
                    {refItem.value}
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
      <ScrollToTop />
    </motion.div>
  );
};

export default ArticleDetail;
