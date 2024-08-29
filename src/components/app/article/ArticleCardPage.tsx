import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';
import ReadMoreButton from 'components/button/ReadMoreButton';
import useRefetchWebSocket from 'hooks/useRefetchWebSocket'; // นำเข้า useRefetchWebSocket
import router from 'next/router';
import React from 'react';
import { useMutation, useQuery } from 'react-query'; // นำเข้า useMutation
import {
  getAllArticle,
  getArticleImageUrl,
  trackArticleClick,
} from 'services/articleService'; // นำเข้า trackArticleClick
import { ArticleData } from 'types/AdminGetDataTypes';
import DataNotFound from 'utils/DataNotFound';

const ArticleCardPage = () => {
  useRefetchWebSocket('articles', 'UPDATE_ARTICLES');

  // Fetch ข้อมูล articles
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery<ArticleData[], Error>('articles', getAllArticle, {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: 1000 * 60 * 5,
  });

  const mutation = useMutation(
    (articleData: { articleId: number; clickCount: number }) =>
      trackArticleClick(
        articleData.articleId.toString(),
        articleData.clickCount
      ),
    {
      onSuccess: () => {
        // เมื่อสำเร็จ รีเซ็ตการนับคลิกใน Local Storage
      },
      onError: () => {
        // จัดการข้อผิดพลาดตามต้องการ
      },
    }
  );

  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // ฟังก์ชันช่วยเหลือสำหรับจัดการ Local Storage
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
      // เรียกใช้งาน mutation เพื่อส่งข้อมูลไปยัง backend
      mutation.mutate({ articleId, clickCount });
      setClicksToStorage(articleId, 0); // รีเซ็ตการนับเมื่อส่งข้อมูลสำเร็จ
    }

    router.push(`/app/article/${articleId}`);
  };

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
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography color="error">Error: {error.message}</Typography>
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
      {Array.isArray(articles) && articles.length > 0 ? (
        articles.map((article) => (
          <Card
            key={article.id}
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
              <Box sx={{ position: 'relative' }}>
                <img
                  src={getArticleImageUrl(article.article_cover)}
                  alt={article.article_name}
                  style={{
                    width: '100%',
                    height: '250px',
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
                  onClick={() => handleReadMoreClick(article.id)} // เรียกใช้ฟังก์ชันที่เราสร้าง
                  fullWidth
                  text="อ่านเพิ่มเติม"
                  sx={{
                    mt: 3,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <DataNotFound />
      )}
    </Box>
  );
};

export default ArticleCardPage;
