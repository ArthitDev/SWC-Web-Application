import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import ReadMoreButton from 'components/button/ReadMoreButton';
import usePagination from 'hooks/usePagination';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket';
import router from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  getArticleImageUrl,
  getArticlesWithPagination,
  trackArticleClick,
} from 'services/articleService';
import { ArticleData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';
import ReusePagination from 'utils/ReusePagination';
import ScrollFadeIn from 'utils/ScrollFadeIn'; // นำเข้า ScrollFadeIn

import CategoryDropdown from './CategoryDropdown';

type ArticleCardPageProps = {
  searchTerm: string; // เพิ่ม prop นี้เพื่อรับค่าการค้นหา
};

const ArticleCardPage: React.FC<ArticleCardPageProps> = ({ searchTerm }) => {
  useRefetchWebSocket('articles', 'UPDATE_ARTICLES');

  const { page, limit, totalPages, setPage, setTotalPages } = usePagination();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
    setPage(1);
  };

  const {
    data: articlesData,
    isLoading,
    error,
  } = useQuery(
    ['articles', selectedCategory, page, limit, searchTerm], // รวม searchTerm ใน dependency array
    () => getArticlesWithPagination(selectedCategory, searchTerm, page, limit),
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
      },
    }
  );

  const mutation = useMutation(
    (articleData: { articleId: number; clickCount: number }) =>
      trackArticleClick(
        articleData.articleId.toString(),
        articleData.clickCount
      ),
    {
      onSuccess: () => {
        // Reset click count in local storage on success
      },
      onError: () => {
        // Handle error as needed
      },
    }
  );

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getClicksFromStorage = (articleId: number) => {
    const clicks = JSON.parse(localStorage.getItem('articleClicks') || '{}');
    return clicks[articleId] || 0;
  };

  const setClicksToStorage = (articleId: number, count: number) => {
    const clicks = JSON.parse(localStorage.getItem('articleClicks') || '{}');
    clicks[articleId] = count;
    localStorage.setItem('articleClicks', JSON.stringify(clicks));
  };

  const handleReadMoreClick = (articleId: number) => {
    const clickCount = getClicksFromStorage(articleId) + 1;
    setClicksToStorage(articleId, clickCount);

    if (clickCount >= 5) {
      mutation.mutate({ articleId, clickCount });
      setClicksToStorage(articleId, 0);
    }

    router.push(`/app/article/${articleId}`);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
        <Typography sx={{ marginTop: 2 }}>กำลังโหลดข้อมูล...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <Typography color="error">ไม่สามารถโหลดข้อมูลได้</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          pb: 2,
        }}
      >
        <CategoryDropdown
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Box>
      {articlesData && articlesData.data && articlesData.data.length > 0 ? (
        articlesData.data.map((article: ArticleData) => (
          <ScrollFadeIn key={article.id}>
            {' '}
            {/* ครอบ ScrollFadeIn รอบ Card */}
            <Card
              elevation={1}
              sx={{
                width: '100%',
                maxWidth: '400px',
                marginBottom: 3,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {article.article_cover && (
                <Box
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    width: '100%',
                    height: '250px',
                  }}
                >
                  <img
                    src={getArticleImageUrl(article.article_cover)}
                    alt={article.article_name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontWeight="bold"
                >
                  {article.article_name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="start"
                >
                  {stripHtmlTags(article.article_content).substring(0, 100)}...
                </Typography>
                <Box>
                  <ReadMoreButton
                    onClick={() => handleReadMoreClick(article.id)}
                    fullWidth
                    text="อ่านเพิ่มเติม"
                    sx={{ mt: 3 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </ScrollFadeIn>
        ))
      ) : (
        <DataNotFound />
      )}

      <ReusePagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default ArticleCardPage;