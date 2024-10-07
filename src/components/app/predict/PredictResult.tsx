/* eslint-disable camelcase */
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import BackButtonPage from 'components/button/BackButtonPage';
import CustomModal from 'components/modal/CustomModal';
import { usePredict } from 'contexts/PredictContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import { getWoundImageUrl, trackWoundClick } from 'services/woundService';
import COLORS from 'themes/colors';
import NoPredictFound from 'utils/NoPredictFound';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

import * as styles from './PredictPage.style';
import WarningCard from './WarningCard';

type PredictResultProps = {};

const PredictResult: React.FC<PredictResultProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOverlayOpen, setIsImageOverlayOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Track selected image
  const router = useRouter();
  const { result, setResult } = usePredict();

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmExit = () => {
    setResult(null);
    setIsModalOpen(false);
    router.push('/app/predict');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenImageOverlay = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Set the selected image
    setIsImageOverlayOpen(true);
  };

  const handleCloseImageOverlay = () => {
    setIsImageOverlayOpen(false);
    setSelectedImage(null); // Clear the selected image on close
  };

  if (!result) {
    return <NoPredictFound />;
  }

  const { predictions, image_url } = result;

  const sortedPredictions = predictions.sort(
    (a, b) => b.confidence - a.confidence
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
            {image_url ? (
              <>
                <Box
                  component="img"
                  src={getWoundImageUrl(image_url)}
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
                  onClick={() =>
                    handleOpenImageOverlay(getWoundImageUrl(image_url))
                  }
                >
                  <ZoomInIcon style={{ color: 'blue', fontSize: '24px' }} />
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

          {sortedPredictions.length > 0 &&
            sortedPredictions.map((prediction, index) => (
              <Card
                key={index}
                sx={{
                  mt: 2,
                  borderRadius: '16px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      textAlign:
                        prediction.wound_type === 'ไม่พบแผล'
                          ? 'center'
                          : 'left',
                      marginTop:
                        prediction.wound_type === 'ไม่พบแผล' ? '15px' : '0px',
                    }}
                  >
                    {prediction.wound_type}
                  </Typography>

                  {prediction.wound_type !== 'ไม่พบแผล' && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box
                        sx={{
                          width: '80%',
                          bgcolor: '#E0E0E0',
                          height: '8px',
                          borderRadius: '4px',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${prediction.confidence}%`,
                            bgcolor: COLORS.blue[6],
                            height: '100%',
                            borderRadius: '4px',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', color: COLORS.blue[6] }}
                      >
                        {prediction.confidence.toFixed(1)}%
                      </Typography>
                    </Box>
                  )}

                  {prediction.additional_data?.wound_covers &&
                    prediction.additional_data.wound_covers.length > 0 && (
                      <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Slider {...sliderSettings}>
                          {prediction.additional_data.wound_covers.map(
                            (cover, coverIndex) => (
                              <Box
                                key={coverIndex}
                                sx={{ position: 'relative' }}
                              >
                                <Box
                                  component="img"
                                  src={getWoundImageUrl(cover)}
                                  alt={`Wound Image ${coverIndex + 1}`}
                                  sx={{
                                    width: '100%',
                                    height: '220px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                  }}
                                />
                                <IconButton
                                  onClick={() =>
                                    handleOpenImageOverlay(
                                      getWoundImageUrl(cover)
                                    )
                                  }
                                  sx={{
                                    position: 'absolute',
                                    bottom: 8,
                                    right: 8,
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    '&:hover': {
                                      backgroundColor: '#f8d7da',
                                    },
                                    borderRadius: '20%',
                                    padding: '4px',
                                  }}
                                >
                                  <ZoomInIcon
                                    style={{ color: 'blue', fontSize: '24px' }}
                                  />
                                </IconButton>
                              </Box>
                            )
                          )}
                        </Slider>
                      </Box>
                    )}

                  {prediction.wound_type !== 'ไม่พบแผล' && (
                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                    >
                      <Button
                        variant="text"
                        sx={{
                          mt: 2,
                          color: COLORS.blue[6],
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={async () => {
                          const woundId = prediction.additional_data?.id;
                          if (woundId) {
                            await trackWoundClick(woundId, 1);
                            router.push(`/app/wound/${woundId}`);
                          } else {
                            toast.error('ขออภัย : เซิฟเวอร์เกิดปัญหา');
                          }
                        }}
                        endIcon={
                          <ChevronRightIcon
                            sx={{
                              position: 'relative',
                              fontSize: '25px',
                              mt: 0.3,
                            }}
                          />
                        }
                      >
                        ดูข้อมูลเพิ่มเติม
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
        </Box>
      </motion.div>

      <Modal
        open={isImageOverlayOpen}
        onClose={handleCloseImageOverlay}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
            maxWidth: '100%',
            height: 'auto',
            minWidth: 350,
            maxHeight: '100vh',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt="Zoom Preview"
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
              }}
            />
          )}
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              },
              borderRadius: '8px',
              padding: '4px',
            }}
            onClick={handleCloseImageOverlay}
          >
            <CloseIcon style={{ color: 'red', fontSize: '24px' }} />
          </IconButton>
        </Box>
      </Modal>

      <CustomModal
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
