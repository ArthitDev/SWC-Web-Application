import CloseIcon from '@mui/icons-material/Close';
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';

const PrivacyNoticeCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Box pt={5}>
      <Box
        sx={{
          background:
            'linear-gradient(90deg, rgba(58,156,253,1) 0%, rgba(35,90,219,1) 100%)',
          borderRadius: 2,
          padding: 4,
          marginBottom: 1,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => setIsVisible(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 1,
          }}
        >
          <PrivacyTipOutlinedIcon
            sx={{ color: 'white', fontSize: 32, marginRight: 1 }}
          />
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            โปรดทราบ
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: 'white', textAlign: 'center' }}
        >
          เราให้ความสำคัญอย่างยิ่ง ในการปกป้องความเป็นส่วนตัวของผู้ใช้งาน
          เราจะไม่เก็บข้อมูลรูปแผลที่คุณอัปโหลดเพื่อวิเคราะห์แต่อย่างใด
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyNoticeCard;
