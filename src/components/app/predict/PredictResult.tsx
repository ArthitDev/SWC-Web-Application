import ImageIcon from '@mui/icons-material/Image';
import { Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import router from 'next/router';
import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa'; // Import ไอคอนที่จำเป็น
import BackButtonPage from 'utils/BackButtonPage';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

import ChangeRouteModal from './ChangeRouteModal'; // import ChangeRouteModal เข้ามา
import * as styles from './PredictPage.style'; // ใช้ style เดียวกันกับ PredictPage
import WarningCard from './WarningCard';

type PredictResultProps = {};

const PredictResult: React.FC<PredictResultProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // สร้าง state สำหรับ modal
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // สร้าง state สำหรับรูปภาพที่เลือก

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmExit = () => {
    setIsModalOpen(false);
    router.push('/app/predict');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeInVariants}
        transition={fadeInTransition}
      >
        <BackButtonPage label={'กลับ'} onClick={handleBackClick} />
        <Box sx={styles.Container}>
          <Typography variant="h4" component="h1" sx={styles.Header}>
            ผลการวิเคราะห์
          </Typography>
          <Box sx={styles.DividerResult} />
          <Box sx={styles.ImageContainerResult}>
            {selectedImage ? (
              <>
                <Box
                  component="img"
                  src={selectedImage}
                  alt="Preview"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <IconButton
                  sx={styles.DeletePreviewButton}
                  onClick={handleRemoveImage}
                >
                  <FaRegTrashAlt style={{ color: 'red', fontSize: '24px' }} />
                </IconButton>
              </>
            ) : (
              <>
                <Box sx={styles.IconWrapper}>
                  <ImageIcon sx={{ fontSize: 30, color: '#94a3b8' }} />
                </Box>
                <Typography variant="body2" sx={styles.IconDescription}>
                  รูปภาพแผลของคุณจะปรากฏที่นี่
                </Typography>
              </>
            )}
          </Box>
          <WarningCard />
        </Box>
      </motion.div>

      <ChangeRouteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmExit}
        title="ออกจากหน้านี้"
        description="หากคุณออกจากหน้านี้ ผลการวิเคราะห์จะถูกล้าง"
        confirmText="ยืนยันการออก"
        cancelText="ยกเลิก"
      />
    </>
  );
};

export default PredictResult;
