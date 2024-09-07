import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // นำเข้าไอคอน
import { Box, Card, Typography } from '@mui/material';
import { useRouter } from 'next/router'; // นำเข้า useRouter จาก Next.js
import React from 'react';
import { useQuery } from 'react-query';
import { getTopArticle } from 'services/articleService';

interface TopArticle {
  id: number;
  article_name: string;
}

const TopArticlesCard: React.FC = () => {
  const router = useRouter();
  const { data } = useQuery<TopArticle[]>('topArticles', getTopArticle);

  const handleIconClick = (articleId: number) => {
    router.push(`/app/article/${articleId}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        pb: 2,
      }}
    >
      {data?.map((article) => (
        <Card
          key={article.id}
          sx={{
            display: 'flex',
            backgroundColor: '#F2F9FC',
            borderRadius: '16px',
            padding: 0,
            width: '100%',
            maxWidth: 500,
            maxHeight: 300,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            marginBottom: 1,
          }}
        >
          <Box
            sx={{
              padding: 2,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              {article.article_name}
            </Typography>
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 1,
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
              onClick={() => handleIconClick(article.id)}
            >
              <ArrowForwardIcon sx={{ color: '#1976d2' }} />
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default TopArticlesCard;
