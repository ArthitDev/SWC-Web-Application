import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Box, Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { getTopArticle } from 'services/articleService';
import ScrollFadeIn from 'utils/ScrollFadeIn';

interface TopArticle {
  id: number;
  article_name: string;
  click_count: number;
}

const truncateText = (text: string, limit: number) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

const getFontSize = (index: number) => {
  if (index === 0) return '2rem';
  if (index < 3) return '1.75rem';
  return '1.5rem';
};

const TopArticlesCard: React.FC = () => {
  const router = useRouter();
  const { data } = useQuery<TopArticle[]>('topArticles', getTopArticle);

  const handleIconClick = (articleId: number) => {
    router.push(`/app/article/${articleId}`);
  };

  const getFireIcon = (index: number) => {
    const colors = ['#FF4500', '#FF6347', '#FF7F50', '#FFA07A', '#FFDAB9'];
    return (
      <LocalFireDepartmentIcon
        sx={{
          color: colors[index],
          fontSize: getFontSize(index), // Use the helper function
          filter: `drop-shadow(0 0 3px ${colors[index]})`,
        }}
      />
    );
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
      {data?.slice(0, 5).map((article, index) => (
        <ScrollFadeIn key={article.id}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F2F9FC',
              borderRadius: '16px',
              padding: 0,
              width: '100%',
              maxWidth: 500,
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
                alignItems: 'stretch',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}
              >
                {getFireIcon(index)}
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      marginBottom: 0.5,
                    }}
                  >
                    {truncateText(article.article_name, 30)}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontSize: '0.875rem',
                      color: '#888',
                    }}
                  >
                    {`อ่านแล้ว ${article.click_count ?? 0} ครั้ง`}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  cursor: 'pointer',
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
        </ScrollFadeIn>
      ))}
    </Box>
  );
};

export default TopArticlesCard;
