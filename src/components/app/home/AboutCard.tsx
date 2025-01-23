import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import COLORS from 'themes/colors';
import ScrollFadeIn from 'utils/ScrollFadeIn'; // นำเข้า ScrollFadeIn

const AboutCard: React.FC<{
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
        width: '100%',
        maxWidth: 500,
        textAlign: 'center',
        color: 'black',
        borderRadius: 3,
        marginBottom: 4,
        boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography
          sx={{
            pt: 2,
            marginBottom: 2,
            ...sxDescription,
            fontSize: 15,
            fontWeight: 'medium',
          }}
        >
          {description}
        </Typography>
        <Button
          variant="contained"
          endIcon={buttonIcon}
          onClick={onButtonClick}
          sx={{
            boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: 'white',
            fontSize: 15,
            fontWeight: 'bold',
            color: COLORS.blue[6],
            transition: 'transform 0.3s',
            '&:hover': {
              boxShadow: '7px 7px 5px 0px rgba(0, 0, 0, 0.1)',
              transform: 'translateX(5px)',
            },
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  </ScrollFadeIn>
);

export default AboutCard;
