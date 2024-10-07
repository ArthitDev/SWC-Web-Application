import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { usePredict } from 'contexts/PredictContext';
import { motion } from 'framer-motion';
import useMobilePermissions from 'hooks/useMobilePermissions'; // Import the custom hook
import { InfoIcon } from 'lucide-react';
import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast'; // Import toast
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { useMutation } from 'react-query';
import Webcam from 'react-webcam';
import { predictImage } from 'services/predictService'; // Import predictImage service
import COLORS from 'themes/colors';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

import HeaderIconRight from '@/components/app/home/HeaderIconRight';

import HowToUseModal from './HowToUseModal'; // เพิ่มการนำเข้า HowToUseModal
import * as styles from './PredictPage.style';
import PrivacyNoticeCard from './PrivacyNoticeCard';

const PredictPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [objectFit, setObjectFit] = useState<'cover' | 'contain'>('cover');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isHowToUseModalOpen, setIsHowToUseModalOpen] = useState(false); // เพิ่ม state สำหรับการเปิด/ปิด Modal

  const webcamRef = useRef<Webcam>(null);
  const { checkFilePermission } = useMobilePermissions();

  const { setResult } = usePredict(); // Use the Context to store result

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent)) {
      setFacingMode('environment');
    } else {
      setFacingMode('user');
    }
  }, []);

  const handleFileInputClick = async () => {
    try {
      await checkFilePermission();
      toast.dismiss();
    } catch (err) {
      toast.error('ยังไม่ได้อนุญาตสิทธิ์ในการเข้าถึงไฟล์');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isCameraOpen) {
      setIsCameraOpen(false);
    }

    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 7 * 1024 * 1024) {
        const inputElement = event.target as HTMLInputElement;
        inputElement.value = '';
        toast.error('ขนาดของรูปภาพไม่ควรเกิน 7MB');
        return;
      }

      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setObjectFit(aspectRatio > 1 ? 'cover' : 'contain');
        toast.success('แนบรูปภาพแล้ว');
      };
    } else {
      toast.error('ไม่พบรูปภาพที่แนบ');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleTakePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const byteString = atob(imageSrc.split(',')[1]);
        const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], 'photo.jpg', { type: mimeString });
        setSelectedImage(file);
        setImagePreview(imageSrc);
        toast.success('ถ่ายรูปภาพแล้ว');
        setIsCameraOpen(false);
      } else {
        toast.error('เกิดข้อผิดพลาดในการถ่ายรูปภาพ');
      }
    }
  };

  const handleOpenCamera = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraOpen(true);
      toast.dismiss();
      toast.success('เปิดกล้องแล้ว');
    } catch (err) {
      toast.error('ยังไม่ได้อนุญาตสิทธิ์ในการเข้าถึงกล้อง');
    }
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const mutation = useMutation(
    (imageData: FormData) => predictImage(imageData),
    {
      onMutate: () => {
        toast.loading('กำลังวิเคราะห์ภาพ...', { id: 'loading' });
      },
      onSuccess: (data) => {
        toast.dismiss('loading');
        toast.success('การวิเคราะห์เสร็จสิ้น');

        setResult(data);
        router.push('/app/predict/result');
      },
      onError: (error: any) => {
        toast.dismiss('loading');
        if (error.message.includes('The server took too long to respond')) {
          toast.error('เซิร์ฟเวอร์ไม่ตอบสนองในเวลาที่กำหนด');
        } else {
          toast.error('เกิดข้อผิดพลาดในการวิเคราะห์ภาพ');
        }
      },
    }
  );

  const handlePredict = () => {
    if (!selectedImage) {
      toast.error('กรุณาแนบหรือถ่ายรูปภาพก่อนวิเคราะห์');
      return;
    }
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedImage);
    mutation.mutate(formData);
  };

  const handleOpenHowToUseModal = () => {
    setIsHowToUseModalOpen(true);
  };

  const handleCloseHowToUseModal = () => {
    setIsHowToUseModalOpen(false);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariants}
      transition={fadeInTransition}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
          position: 'relative',
        }}
      >
        <HeaderIconRight
          icon={<InfoIcon color={COLORS.blue[6]} />}
          onClick={handleOpenHowToUseModal}
        />
      </Box>
      <Box sx={styles.Container}>
        <Typography variant="h4" component="h1" sx={styles.Header}>
          วิเคราะห์ภาพแผลด้วย AI
        </Typography>
        <Box sx={styles.Divider} />
        <Typography variant="body1" sx={styles.Description}>
          ถ่ายภาพ หรือ เลือกภาพแผลเพื่อเริ่มต้นวิเคราะห์
        </Typography>
        <Box sx={styles.ImageContainer}>
          {imagePreview ? (
            <>
              <Box
                component="img"
                src={imagePreview}
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
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'กำลังวิเคราะห์...' : 'วิเคราะห์ภาพแผล'}
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

        {/* เพิ่ม HowToUseModal */}
        <HowToUseModal
          open={isHowToUseModalOpen}
          onClose={handleCloseHowToUseModal}
        />

        <PrivacyNoticeCard />
      </Box>
    </motion.div>
  );
};

export default PredictPage;
