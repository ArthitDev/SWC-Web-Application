import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // เพิ่มการนำเข้าไอคอน
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
import CustomModal from 'components/modal/CustomModal';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getWoundImageUrl } from 'services/woundService'; // นำเข้า service สำหรับดึงรูป
import COLORS from 'theme/colors';
import BackButtonPage from 'utils/BackButtonPage';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

import * as styles from './PredictPage.style';
import WarningCard from './WarningCard';

type PredictResultProps = {};

const API_URL = process.env.NEXT_PUBLIC_API_IMAGE_PREDICT_URL;

const PredictResult: React.FC<PredictResultProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOverlayOpen, setIsImageOverlayOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<
    Array<{
      wound_type: string;
      confidence: number;
      additional_data?: { id: string; wound_cover: string };
    }>
  >([]);

  const router = useRouter();

  useEffect(() => {
    if (router.query.predictions && router.query.image_url) {
      // Parse predictions (ซึ่งเป็น JSON string ที่ส่งผ่าน URL)
      const parsedPredictions = JSON.parse(router.query.predictions as string);
      // Sort predictions by confidence in descending order (highest first)
      const sortedPredictions = parsedPredictions.sort(
        (a: { confidence: number }, b: { confidence: number }) =>
          b.confidence - a.confidence
      );
      setPredictions(sortedPredictions);

      // Set the image URL
      const fullImageUrl = `${API_URL}${router.query.image_url}`;
      setImageUrl(fullImageUrl);
    }
  }, [router.query]);

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

  const handleOpenImageOverlay = () => {
    setIsImageOverlayOpen(true);
  };

  const handleCloseImageOverlay = () => {
    setIsImageOverlayOpen(false);
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
            {imageUrl ? (
              <>
                <Box
                  component="img"
                  src={imageUrl}
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
                  onClick={handleOpenImageOverlay}
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

          {predictions.length > 0 &&
            predictions.map((prediction, index) => (
              <Card
                key={index}
                sx={{
                  mt: 2,
                  borderRadius: '16px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {prediction.wound_type}
                  </Typography>
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

                  {/* เพิ่มการแสดงผลรูปแผลจาก wound_cover */}
                  {prediction.additional_data?.wound_cover && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Box
                        component="img"
                        src={getWoundImageUrl(
                          prediction.additional_data.wound_cover
                        )}
                        alt="Wound Image"
                        sx={{
                          width: '100%',
                          height: '200px',
                          borderRadius: '8px',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  )}

                  {/* ซ่อนปุ่มดูเพิ่มเติมหาก wound_type คือ "ไม่ใช่แผล" */}
                  {prediction.wound_type !== 'ไม่ใช่แผล' && (
                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                    >
                      <Button
                        variant="text"
                        sx={{
                          color: COLORS.blue[6],
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onClick={() =>
                          router.push(
                            `/app/wound/${prediction.additional_data?.id}`
                          )
                        }
                        endIcon={
                          <ChevronRightIcon
                            sx={{
                              position: 'relative',
                              fontSize: '25px',
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '80%',
            maxWidth: 700,
            minWidth: 400,
            maxHeight: '90vh',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 3,
          }}
        >
          <Box
            component="img"
            src={imageUrl || ''}
            alt="Enlarged Preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
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
