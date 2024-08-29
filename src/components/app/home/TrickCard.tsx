import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, Typography } from '@mui/material';
import useRandomTrick from 'hooks/useRandomTrick';
import router from 'next/router';
import React from 'react';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';

const TrickCardHome: React.FC = () => {
  const { data, isLoading, error } = useRandomTrick();

  if (isLoading)
    return (
      <HomeCardLoading
        borderColor="#2ECC71"
        backgroundColor="#F2F9FC"
        progressColor="#2ECC71"
        textColor="#1B8F29"
      />
    );

  if (error)
    return (
      <HomeCardError
        borderColor="#2ECC71"
        backgroundColor="#F2F9FC"
        textColor="#1B8F29"
        errorMessage="ไม่สามารถโหลดข้อมูลได้"
      />
    );

  // Check if data is undefined or null
  if (!data || !data.trick_content)
    return (
      <HomeCardError
        borderColor="#2ECC71"
        backgroundColor="#F2F9FC"
        textColor="#1B8F29"
        errorMessage="ไม่มีข้อมูลในขณะนี้"
      />
    );

  const handleViewMore = () => {
    router.push('/app/trick');
  };

  return (
    <Card
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
        marginBottom: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#2ECC71',
          width: '8px',
        }}
      />
      <Box
        sx={{
          padding: 2,
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1B8F29',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span role="img" aria-label="lightbulb" style={{ marginRight: 8 }}>
              💡
            </span>
            เคล็ดไม่ลับ
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '1rem',
            marginBottom: 2,
            color: '#000000',
            lineHeight: 1.5,
            maxHeight: 200,
            overflow: 'auto',
          }}
        >
          {data.trick_content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleViewMore}
            sx={{
              borderRadius: '12px',
              backgroundColor: '#34C759',
              fontSize: 14,
              fontWeight: 'bold',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1B8F29',
              },
              textTransform: 'none',
              padding: '6px 12px',
              boxShadow: 'none',
            }}
            endIcon={<ArrowForwardIcon />}
          >
            ดูเพิ่มเติม
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default TrickCardHome;
