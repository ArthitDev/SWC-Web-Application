import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

type ImageUploadProps = {
  onImageUpload: (file: File | null) => void;
  previewImage: string | null;
  onClearImage: () => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  previewImage,
  onClearImage,
}) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box mt={2} mb={2}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleImageUpload}
      />
      <label htmlFor="raised-button-file">
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: '4px',
            padding: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            height: '300px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  onClearImage();
                }}
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 0, 0, 0.7)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 0, 0, 0.9)',
                  },
                }}
              >
                <FaTrashAlt color="white" size={20} />
              </IconButton>
            </>
          ) : (
            <Typography>เลือกรูปภาพ</Typography>
          )}
        </Box>
      </label>
    </Box>
  );
};

export default ImageUpload;
