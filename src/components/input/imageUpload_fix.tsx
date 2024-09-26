import { Box, Button, Grid, IconButton } from '@mui/material';
import { Upload, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onImageUpload: (files: File[]) => void;
  onClearImage: (index: number) => void;
  maxImages: number;
  currentImages: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onClearImage,
  maxImages,
  currentImages,
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]); // For image URLs
  const [imageFiles, setImageFiles] = useState<File[]>([]); // For actual files

  useEffect(() => {
    // Update previewImages state when currentImages changes (for URL display)
    setPreviewImages(currentImages);
  }, [currentImages]);

  const isImageDuplicate = (newImage: File, existingFiles: File[]) => {
    return existingFiles.some((existingFile) => {
      // Compare both name and size to check for duplicates
      return (
        existingFile.name === newImage.name &&
        existingFile.size === newImage.size
      );
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const remainingSlots = maxImages - imageFiles.length; // เปลี่ยนเป็นใช้ imageFiles.length แทน currentImages.length

    if (newFiles.length > remainingSlots) {
      toast.error(`คุณสามารถอัปโหลดรูปภาพได้อีกเพียง ${remainingSlots} รูป`);
      newFiles.splice(remainingSlots); // ลดจำนวนไฟล์ใหม่ถ้าเกินขีดจำกัด
    }

    const nonDuplicateFiles = newFiles.filter(
      (newFile) => !isImageDuplicate(newFile, imageFiles)
    );

    if (nonDuplicateFiles.length < newFiles.length) {
      toast.error('คุณไม่สามารถอัปโหลดไฟล์ซ้ำได้');
    }

    if (nonDuplicateFiles.length > 0) {
      const newFileURLs = nonDuplicateFiles.map((file) =>
        URL.createObjectURL(file)
      );

      // รวมไฟล์ใหม่เข้ากับไฟล์ที่มีอยู่
      setImageFiles((prevFiles) => [...prevFiles, ...nonDuplicateFiles]); // เก็บไฟล์จริง
      setPreviewImages((prevImages) => [...prevImages, ...newFileURLs]); // เก็บ URL สำหรับแสดงผล
      onImageUpload(nonDuplicateFiles); // ส่งไฟล์จริงไปยัง WoundForm
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove the file
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove the URL
    onClearImage(index); // Notify the parent component
  };

  return (
    <Box p={2}>
      <Box mb={2} display="flex" justifyContent="start">
        <input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <Button
          variant="outlined"
          component="label"
          htmlFor="image-upload"
          startIcon={<Upload />}
          disabled={currentImages.length >= maxImages}
        >
          อัปโหลดรูปภาพสูงสุด 6 รูป
        </Button>
      </Box>
      <Grid container spacing={2}>
        {previewImages.map((image, index) => (
          <Grid item xs={4} key={index}>
            <Box position="relative">
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <IconButton
                onClick={() => removeImage(index)}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: 'rgba(255, 0, 0, 0.7)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'red',
                  },
                }}
              >
                <X style={{ width: 16, height: 16 }} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageUpload;
