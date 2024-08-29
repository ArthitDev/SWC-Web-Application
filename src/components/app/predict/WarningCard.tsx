import { Box, Typography } from '@mui/material';
import React from 'react';
import { IoWarning } from 'react-icons/io5';

const WarningCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#FEFCE8',
        borderRadius: '4px',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        maxWidth: '100%',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        borderLeft: '4px solid #EAB308',
      }}
    >
      <IoWarning
        size={24}
        color="#EAB308"
        style={{ flexShrink: 0, marginRight: '12px', marginTop: '2px' }}
      />
      <Box>
        <Typography
          variant="body1"
          component="p"
          sx={{
            color: '#000000',
            fontSize: '14px',
            lineHeight: 1.5,
            fontWeight: 500,
            marginBottom: '4px',
          }}
        >
          คำเตือน : ผลการวิเคราะห์นี้เป็นเพียงการประมาณการเบื้องต้น
          ความแม่นยำอาจแตกต่างกันไป
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: '#000000',
            fontSize: '14px',
            lineHeight: 1.5,
          }}
        >
          ขึ้นอยู่กับคุณภาพของภาพและปัจจัยอื่นๆ
          กรุณาปรึกษาแพทย์หรือผู้เชี่ยวชาญสำหรับการวินิจฉัยที่แม่นยำ
        </Typography>
      </Box>
    </Box>
  );
};

export default WarningCard;
