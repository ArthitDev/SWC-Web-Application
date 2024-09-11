import 'dayjs/locale/th';

import {
  Book as BookIcon,
  EmojiObjects as EmojiObjectsIcon,
  Healing as HealingIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import {
  getArticleClickData,
  getDashboardData,
  getWoundClickData,
} from 'services/dashboardServices';
import DataNotFound from 'utils/DataNotFound';
import withAuth from 'utils/withAuth';

const DoughnutChart = dynamic(() => import('components/chart/DoughnutChart'), {
  ssr: false,
});

const LineChart = dynamic(() => import('components/chart/LineChart'), {
  ssr: false,
});

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('th');

const DashboardPanel: React.FC = () => {
  const router = useRouter();

  // ดึงข้อมูล dashboard
  const { data, isLoading, isError } = useQuery(
    'dashboardData',
    getDashboardData
  );
  const {
    data: articleClickData,
    isLoading: isArticleLoading,
    isError: isArticleError,
  } = useQuery('articleClickData', getArticleClickData);
  const {
    data: woundClickData,
    isLoading: isWoundLoading,
    isError: isWoundError,
  } = useQuery('woundClickData', getWoundClickData);

  if (isLoading || isArticleLoading || isWoundLoading) {
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

  if (isError || isArticleError || isWoundError) {
    return <DataNotFound />;
  }

  const dashboardItems = [
    {
      title: 'จำนวนแผลทั้งหมด',
      value: data?.woundCount,
      icon: HealingIcon,
      color: '#FF6B6B',
      path: '/admin/wound',
    },
    {
      title: 'จำนวนบทความทั้งหมด',
      value: data?.articleCount,
      icon: BookIcon,
      color: '#4ECDC4',
      path: '/admin/articles',
    },
    {
      title: 'จำนวนเคล็ดไม่ลับทั้งหมด',
      value: data?.trickCount,
      icon: EmojiObjectsIcon,
      color: '#6BCB77',
      path: '/admin/trick',
    },
    {
      title: 'จำนวนรู้หรือไม่ทั้งหมด',
      value: data?.didYouKnowCount,
      icon: LightbulbIcon,
      color: '#FFD93D',
      path: '/admin/didyouknow',
    },
  ];

  const labels = articleClickData?.map((article: any) => article.article_name);
  const dataValues = articleClickData?.map(
    (article: any) => article.click_count
  );
  const articleDates = articleClickData?.map((article: any) =>
    dayjs(article.created_at).tz('Asia/Bangkok').format('D MMMM YYYY')
  );

  // การแปลงวันที่สำหรับ woundClickData
  const woundLabels = woundClickData?.map((wound: any) => wound.wound_name);
  const woundDates = woundClickData?.map((wound: any) =>
    dayjs(wound.created_at).tz('Asia/Bangkok').format('D MMMM YYYY')
  );
  const woundDataPoints = woundClickData?.map(
    (wound: any) => wound.click_count
  );

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 5, mb: 4 }}>
        <Grid container spacing={3}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                onClick={() => handleCardClick(item.path)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '12px',
                  border: `3px solid ${item.color}`,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <item.icon
                      sx={{ fontSize: 40, color: item.color, mr: 1 }}
                    />
                    <Typography variant="h6" component="div" align="center">
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} mt={5}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <DoughnutChart
                title="บทความที่ได้รับความนิยม"
                labels={labels}
                dataValues={dataValues}
                dates={articleDates}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LineChart
                title="แผลที่ได้รับความนิยม"
                labels={woundDates}
                dataPoints={woundDataPoints}
                woundLabels={woundLabels}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default withAuth(DashboardPanel);
