import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast'; // Import toast
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import Webcam from 'react-webcam';
import COLORS from 'theme/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

import * as styles from './PredictPage.style';
import PrivacyNoticeCard from './PrivacyNoticeCard';

const PredictPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
      setFacingMode('environment');
    } else {
      setFacingMode('user');
    }
  }, []);

  // Function to check if the device is mobile
  const isMobileDevice = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent);
  };

  // Function to check file access permission only on mobile devices
  const checkFilePermission = async () => {
    if (isMobileDevice() && navigator.permissions) {
      try {
        const result = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        });
        if (result.state !== 'granted') {
          toast.error('กรุณาให้สิทธ์ในการเข้าถึงไฟล์');
        }
      } catch (error) {
        //
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCameraOpen) {
      setIsCameraOpen(false);
    }

    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (aspectRatio > 1) {
          setObjectFit('cover');
        } else {
          setObjectFit('contain');
        }
        toast.success('แนบรูปภาพแล้ว');
        setSelectedImage(imageUrl);
      };
    } else {
      toast.error('ไม่พบไ��ล์รูป��า��');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleTakePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setSelectedImage(imageSrc);
        toast.success('ถ่ายรูปภาพแล้ว');
        setIsCameraOpen(false);
      } else {
        toast.error('เกิดข้อผิดพลาดในการถ่ายรูปภาพ');
      }
    }
  };

  const handleOpenCamera = async () => {
    setSelectedImage(null);

    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraOpen(true);
      toast.success('เปิดกล้องแล้ว');
    } catch (err) {
      toast.error('กรุณาให้สิทธ์ในการเข้าถึงกล้อง');
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  // Call checkFilePermission before file input is triggered, only on mobile
  const handleFileInputClick = async () => {
    await checkFilePermission();
  };

  const handlePredict = () => {
    router.push(`/app/predict/result`);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariants}
      transition={fadeInTransition}
    >
      <Box sx={styles.Container}>
        <Typography variant="h4" component="h1" sx={styles.Header}>
          วิเคราะห์ภาพแผลด้วย AI
        </Typography>

        <Box sx={styles.Divider} />

        <Typography variant="body1" sx={styles.Description}>
          ถ่ายภาพ หรือ เลือกภาพแผลเพื่อเริ่มต้นวิเคราะห์
        </Typography>

        <Box sx={styles.ImageContainer}>
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
                  objectFit,
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

          {isCameraOpen && (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode,
                }}
                style={{
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
                onClick={handleCloseCamera}
              >
                <FaTimes style={{ color: 'red', fontSize: '24px' }} />
              </IconButton>
            </>
          )}
        </Box>

        {isCameraOpen && (
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: COLORS.blue[6],
              display: 'block',
              mx: 'auto',
              mb: 3,
            }}
            onClick={handleTakePhoto}
          >
            ถ่ายภาพ
          </Button>
        )}

        <Box sx={styles.ButtonGroup}>
          <Button
            variant="contained"
            sx={styles.MainButton}
            onClick={handlePredict}
          >
            วิเคราะห์ภาพแผล
          </Button>

          <Button
            variant="contained"
            sx={styles.IconButton}
            component="label"
            onClick={handleFileInputClick}
          >
            <AddPhotoAlternateIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>

          <Button
            variant="contained"
            sx={styles.IconButton}
            onClick={handleOpenCamera}
          >
            <CameraAltIcon />
          </Button>
        </Box>
        <PrivacyNoticeCard />
      </Box>
    </motion.div>
  );
};

export default PredictPage;
