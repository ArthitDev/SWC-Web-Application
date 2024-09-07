import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IoWarning } from 'react-icons/io5';

const WarningCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        backgroundColor: '#FEFCE8',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        borderLeft: '4px solid #EAB308',
        position: 'relative',
      }}
    >
      <IoWarning
        size={24}
        color="#EAB308"
        style={{ flexShrink: 0, marginRight: '12px', marginTop: '2px' }}
      />
      <Box sx={{ flexGrow: 1, paddingRight: '24px' }}>
        <Typography
          variant="body1"
          component="p"
          sx={{
            color: '#000000',
            fontSize: '16px',
            lineHeight: 1.5,
            fontWeight: 500,
            marginBottom: '4px',
          }}
        >
          คำเตือน : ผลการวิเคราะห์นี้เป็นเพียงการประมาณการเบื้องต้น
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: '#000000',
            fontSize: '15px',
            lineHeight: 1.5,
          }}
        >
          ความแม่นยำอาจแตกต่างกันไปขึ้นอยู่กับคุณภาพของภาพและปัจจัยอื่นๆ
          กรุณาปรึกษาแพทย์หรือผู้เชี่ยวชาญสำหรับการวินิจฉัยที่แม่นยำ
        </Typography>
      </Box>
      <IconButton
        sx={{
          position: 'absolute',
          top: '0px',
          right: '5px',
          padding: '5px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        }}
        onClick={handleClose}
      >
        <CloseIcon sx={{ fontSize: '20px', color: 'red' }} />
      </IconButton>
    </Box>
  );
};

export default WarningCard;
