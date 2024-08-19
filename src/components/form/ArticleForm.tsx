import { Box, TextField, Typography } from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
import ImageUpload from 'components/input/ImageUpload';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { createArticle } from 'services/articleService';
import COLORS from 'theme/colors';
import { ArticleFormData } from 'types/AdminFormDataPostTypes';

type ArticleFormProps = {
  onClose: () => void;
};

const ArticleForm: React.FC<ArticleFormProps> = ({ onClose }) => {
  const { control, handleSubmit, reset, setValue } = useForm<ArticleFormData>();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const mutation = useMutation(
    (data: { formData: ArticleFormData; image: File }) =>
      createArticle(data.formData, data.image),
    {
      onMutate: () => {
        setLoading(true);
        toast.loading('กำลังบันทึกข้อมูล...');
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success('ข้อมูลบทความถูกสร้างสำเร็จ!');
        setLoading(false);
        reset();
        onClose();
      },
      onError: () => {
        toast.dismiss();
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        setLoading(false);
      },
    }
  );

  const handleFormSubmit = async (data: ArticleFormData) => {
    const imageFile = data.article_cover as unknown as File;
    mutation.mutate({ formData: data, image: imageFile });
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setValue('article_cover', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue('article_cover', null);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box mb={2}>
        <Typography variant="h6">ชื่อบทความ</Typography>
        <Controller
          name="article_name"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนชื่อบทความ',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              placeholder="ป้อนชื่อบทความ"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                sx: {
                  marginBottom: 0,
                  height: 48,
                  borderColor: COLORS.gray[1],
                  borderRadius: 1,
                  '&.Mui-focused fieldset': {
                    border: '1px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          )}
        />
      </Box>
      <Box mb={2}>
        <Typography variant="h6">ชื่อผู้เขียน</Typography>
        <Controller
          name="author_name"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนชื่อผู้เขียน',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              placeholder="ป้อนชื่อผู้เขียน"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                sx: {
                  marginBottom: 0,
                  height: 48,
                  borderColor: COLORS.gray[1],
                  borderRadius: 1,
                  '&.Mui-focused fieldset': {
                    border: '1px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="h6">รูปปก</Typography>
        <ImageUpload
          onImageUpload={handleImageUpload}
          previewImage={previewImage}
          onClearImage={handleClearImage}
        />
      </Box>
      <Box mb={5} mt={2}>
        <Typography variant="h6">เนื้อหา</Typography>
        <Controller
          name="article_content"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนเนื้อหา',
            minLength: {
              value: 10,
              message: 'เนื้อหาควรมีอย่างน้อย 10 ตัวอักษร',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              placeholder="ป้อนเนื้อหา"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>
      <Box>
        <Typography variant="h6">แหล่งอ้างอิง</Typography>
        <Controller
          name="ref"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนแหล่งอ้างอิง',
            minLength: {
              value: 10,
              message: 'เนื้อหาควรมีอย่างน้อย 10 ตัวอักษร',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              placeholder="ป้อนแหล่งอ้างอิง"
              multiline
              rows={3}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>
      <Box mt={10} display="flex" justifyContent="flex-end">
        <CustomButtonSave variant="contained" color="primary" loading={loading}>
          บันทึก
        </CustomButtonSave>
      </Box>
    </form>
  );
};

export default ArticleForm;
