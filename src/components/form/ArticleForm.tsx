import { Box, TextField, Typography } from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
import ImageUpload from 'components/input/ImageUpload';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import {
  createArticle,
  getArticleImageUrl,
  updateArticle,
} from 'services/articleService';
import COLORS from 'theme/colors';
import { ArticleFormData } from 'types/AdminFormDataPostTypes';
import { ArticleData } from 'types/AdminGetDataTypes';

const TinyMCEEditor = dynamic(() => import('components/editor/TinyMCEEditor'), {
  ssr: false,
});

type ArticleFormProps = {
  onCloseDrawer: () => void;
  initialData?: ArticleData | null;
};

const ArticleForm: React.FC<ArticleFormProps> = ({
  onCloseDrawer,
  initialData,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<ArticleFormData>({
    defaultValues: initialData || {
      article_name: '',
      article_content: '',
      ref: '',
      article_cover: null,
    },
  });

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setValue('article_name', initialData.article_name);
      setValue('article_content', initialData.article_content);
      if (initialData.article_cover) {
        setPreviewImage(getArticleImageUrl(initialData.article_cover));
      } else {
        setPreviewImage(null);
      }
    }
  }, [initialData, setValue]);

  const mutation = useMutation(
    initialData
      ? (data: { formData: ArticleFormData; image: File | null }) =>
          updateArticle(
            initialData.id.toString(),
            data.formData,
            data.image || undefined
          )
      : (data: { formData: ArticleFormData; image: File }) =>
          createArticle(data.formData, data.image),
    {
      onMutate: () => {
        setLoading(true);
        toast.loading('กำลังบันทึกข้อมูล...');
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success(
          initialData
            ? 'แก้ไขข้อมูลบทความสำเร็จ!'
            : 'ข้อมูลบทความถูกสร้างสำเร็จ!'
        );
        queryClient.invalidateQueries('article');
        setLoading(false);
        reset();
        onCloseDrawer();
      },
      onError: () => {
        toast.dismiss();
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        setLoading(false);
      },
    }
  );

  const handleFormSubmit = (data: ArticleFormData) => {
    const imageFile = data.article_cover as unknown as File | null;
    if (imageFile) {
      mutation.mutate({ formData: data, image: imageFile });
    } else {
      toast.error('โปรดอัพโหลดรูปภาพ');
      setLoading(false);
    }
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue('article_cover', null);
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setValue('article_cover', file);
      };
      reader.readAsDataURL(file);
    } else {
      handleClearImage();
    }
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
      <Box>
        <Typography variant="h6">รูปปก</Typography>
        <ImageUpload
          onImageUpload={handleImageUpload}
          previewImage={previewImage}
          onClearImage={handleClearImage}
        />
      </Box>
      <Box mb={5} mt={3}>
        <Typography sx={{ mb: 2 }} variant="h6">
          เนื้อหา
        </Typography>
        <Controller
          name="article_content"
          control={control}
          rules={{ required: 'โปรดป้อนเนื้อหา' }}
          render={({ field }) => (
            <TinyMCEEditor
              value={field.value}
              onEditorChange={(content) => field.onChange(content)}
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
