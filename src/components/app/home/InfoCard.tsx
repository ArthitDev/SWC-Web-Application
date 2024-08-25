import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import COLORS from 'theme/colors';

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
          '&:hover': {
            backgroundColor: 'white',
          },
        }}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

export default InfoCard;
