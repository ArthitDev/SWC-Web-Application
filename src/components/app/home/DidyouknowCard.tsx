import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Card, Typography } from '@mui/material';
import useRandomDidYouKnow from 'hooks/useRandomDidYouKnow';
import router from 'next/router';
import React from 'react';
import HomeCardError from 'utils/HomeCardError';
import HomeCardLoading from 'utils/HomeCardLoading';

const DidyouknowCardHome: React.FC = () => {
  const { data, isLoading, error } = useRandomDidYouKnow();

  const handleViewMore = () => {
    router.push('/app/didyouknow');
  };

  if (isLoading)
    return (
      <HomeCardLoading
        borderColor="#EAB308"
        backgroundColor="#F2F9FC"
        progressColor="#EAB308"
        textColor="#EAB308"
      />
    );
  if (error)
    return (
      <HomeCardError
        borderColor="#EAB308"
        backgroundColor="#F2F9FC"
        textColor="#EAB308"
        errorMessage="ไม่สามารถโหลดข้อมูลได้"
      />
    );

  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: '#F2F9FC',
        borderRadius: '16px',
        padding: 0,
        width: '100%',
        maxWidth: 500,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#EAB308',
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
              color: '#CA8A42',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span role="img" aria-label="lightbulb" style={{ marginRight: 8 }}>
              📖
            </span>
            รู้หรือไม่ ?
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '1rem',
            marginBottom: 2,
            color: '#000000',
            lineHeight: 1.5,
          }}
        >
          {data?.didyouknow_content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleViewMore}
            sx={{
              borderRadius: '12px',
              backgroundColor: '#EAB308',
              fontSize: 14,
              fontWeight: 'bold',
              color: 'white',
              '&:hover': {
                backgroundColor: '#CA8A42',
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

export default DidyouknowCardHome;
