import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';
import ScrollFadeIn from 'utils/ScrollFadeIn'; // นำเข้า ScrollFadeIn

const InfoCard: React.FC<{
  title: string;
  description: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  sxDescription?: object;
}> = ({
  title,
  description,
  buttonText,
  buttonIcon,
  onButtonClick,
  sxDescription,
}) => (
  <ScrollFadeIn>
    {/* ครอบ ScrollFadeIn รอบๆ Card */}
    <Card
      sx={{
        background:
          'linear-gradient(90deg, rgba(58,156,253,1) 0%, rgba(35,90,219,1) 100%)',
        width: '100%',
        maxWidth: 500,
        textAlign: 'center',
        color: 'white',
        borderRadius: 3,
        marginBottom: 4,
        boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography sx={{ marginBottom: 2, ...sxDescription }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          startIcon={buttonIcon}
          onClick={onButtonClick}
          sx={{
            borderRadius: '10px',
            backgroundColor: 'white',
            fontSize: 15,
            fontWeight: 'bold',
            color: COLORS.blue[6],
            transition: 'transform 0.3s',
            '&:hover': {
              backgroundColor: 'white',
              transform: 'scale(1.05)',
            },
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  </ScrollFadeIn>
);

export default InfoCard;
