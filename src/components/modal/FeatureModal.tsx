import CloseIcon from '@mui/icons-material/Close';
// ข้อมูลหลากหลาย icon
// ใช้งานง่าย icon
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import Image from 'next/image'; // Import Image from next/image
import React from 'react';
import COLORS from 'themes/colors';

interface FeatureDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  featureType: 'ai' | 'easy' | 'variety';
}

const FeatureDialog: React.FC<FeatureDialogProps> = ({
  open,
  onClose,
  title,
  description,
  featureType,
}) => {
  const renderIcon = () => {
    switch (featureType) {
      case 'ai':
        return (
          <Image
            src="/images/ai-icon.webp"
            alt="AI Icon"
            width={40}
            height={40}
            priority
          />
        );
      case 'easy':
        return (
          <Image
            src="/images/easy-to-use-icon.webp"
            alt="AI Icon"
            width={40}
            height={40}
            priority
          />
        );
      case 'variety':
        return (
          <Image
            src="/images/list-icon.webp"
            alt="AI Icon"
            width={40}
            height={40}
            priority
          />
        );
      default:
        return null;
    }
  };

  const getTitleColor = () => {
    switch (featureType) {
      case 'ai':
        return COLORS.blue[6];
      case 'easy':
        return COLORS.green[5];
      case 'variety':
        return COLORS.orange[7];
      default:
        return COLORS.gray[11];
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '8px 16px',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: COLORS.red[5],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogTitle
        id="dialog-title"
        sx={{
          color: getTitleColor(),
          fontWeight: 'bold',
          textAlign: 'center',
          paddingBottom: 2,
          marginTop: '-16px',
        }}
      >
        {title}
      </DialogTitle>

      <Box pb={3}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 2,
              textAlign: 'justify',
            }}
          >
            {renderIcon()}
          </Box>
          <DialogContentText
            id="dialog-description"
            sx={{
              color: COLORS.gray[11],
              textAlign: 'justify',
              textIndent: '25px',
            }}
          >
            {description}
          </DialogContentText>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default FeatureDialog;
