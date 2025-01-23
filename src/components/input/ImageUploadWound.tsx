import { Box, Button, Grid, IconButton } from '@mui/material';
import { Upload } from 'lucide-react';
import React, { useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

type ImageUploadWoundProps = {
  onImageUpload: (files: File[]) => void;
  previewImages: string[]; // ตอนนี้เป็น array
  onClearImage: (index: number) => void; // เพิ่ม index เพื่อระบุรูปที่จะลบ
};

const ImageUploadWound: React.FC<ImageUploadWoundProps> = ({
  onImageUpload,
  previewImages,
  onClearImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // ใช้ useRef สำหรับการอ้างอิงถึง input

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      const readerArray = Array.from(files).map((file) => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerArray).then(() => {
        onImageUpload(Array.from(files));
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // รีเซ็ต input หลังจากอัปโหลดเสร็จ
        }
      });
    }
  };

  const isUploadLimitReached = previewImages.length >= 6; // ตรวจสอบจำนวนรูปภาพว่าเกิน 6 หรือไม่

  return (
    <Box p={2}>
      <Box mb={2} display="flex" justifyContent="start">
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleImageUpload}
          multiple
          disabled={isUploadLimitReached} // ปิดการใช้งานปุ่มเมื่อครบ 6 รูป
          ref={fileInputRef} // ตั้งค่า ref ให้ input file
        />
        <Button
          variant="outlined"
          component="label"
          htmlFor="raised-button-file"
          startIcon={<Upload />}
          disabled={isUploadLimitReached} // ปิดการใช้งานปุ่มเมื่อครบ 6 รูป
        >
          {isUploadLimitReached
            ? 'จำนวนรูปภาพครบแล้ว'
            : 'อัปโหลดรูปภาพสูงสุด 6 รูป'}{' '}
          {/* เปลี่ยนข้อความปุ่ม */}
        </Button>
      </Box>

      <Grid container spacing={2}>
        {previewImages.map((img, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box position="relative">
              <img
                src={img}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  onClearImage(index); // ลบรูปที่ระบุ
                }}
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
                <FaTrashAlt style={{ width: 16, height: 16 }} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageUploadWound;
