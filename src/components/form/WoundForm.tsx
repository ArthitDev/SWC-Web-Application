import { Box, TextField, Typography } from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
import ImageUpload from 'components/input/ImageUpload';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { createWound, updateWound } from 'services/woundService';
import COLORS from 'theme/colors';
import { WoundFormData } from 'types/AdminFormDataPostTypes';
import { WoundData } from 'types/AdminGetDataTypes';

// Dynamically import TinyMCEEditor with SSR disabled
const TinyMCEEditor = dynamic(() => import('components/editor/TinyMCEEditor'), {
  ssr: false, // Disable server-side rendering
});

type WoundFormProps = {
  onCloseDrawer: () => void;
  initialData?: WoundData | null;
};

const WoundForm: React.FC<WoundFormProps> = ({
  onCloseDrawer,
  initialData,
}) => {
  const { control, handleSubmit, reset, setValue } = useForm<WoundFormData>({
    defaultValues: initialData || {
      wound_name: '',
      wound_content: '',
      ref: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setValue('wound_name', initialData.wound_name);
      setValue('wound_content', initialData.wound_content);
      setPreviewImage(
        `https://drive.google.com/thumbnail?id=${initialData.wound_cover}`
      );
    }
  }, [initialData, setValue]);

  const mutation = useMutation(
    initialData
      ? (data: { formData: WoundFormData; image: File | null }) =>
          updateWound(
            initialData.id.toString(),
            data.formData,
            data.image || undefined
          )
      : (data: { formData: WoundFormData; image: File }) =>
          createWound(data.formData, data.image),
    {
      onMutate: () => {
        setLoading(true);
        toast.loading('กำลังบันทึกข้อมูล...');
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success(
          initialData ? 'แก้ไขข้อมูลแผลสำเร็จ!' : 'ข้อมูลแผลถูกสร้างสำเร็จ!'
        );
        setLoading(false);
        reset();
        onCloseDrawer();
      },
      onError: (error) => {
        toast.dismiss();
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        setLoading(false);
        console.log(`Error: ${error}`);
      },
    }
  );

  const handleFormSubmit = (data: WoundFormData) => {
    const imageFile = data.wound_cover as unknown as File | null;
    if (imageFile) {
      mutation.mutate({ formData: data, image: imageFile });
    } else {
      toast.error('โปรดอัพโหลดรูปภาพ');
      setLoading(false);
    }
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue('wound_cover', null);
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setValue('wound_cover', file);
      };
      reader.readAsDataURL(file);
    } else {
      handleClearImage();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box mb={2}>
        <Typography variant="h6">ชื่อแผล</Typography>
        <Controller
          name="wound_name"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนชื่อแผล',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              placeholder="ป้อนชื่อแผล"
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
      <Box mb={3} mt={3}>
        <Typography variant="h6" mb={2}>
          เนื้อหา
        </Typography>
        <Controller
          name="wound_content"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนเนื้อหา',
            minLength: {
              value: 10,
              message: 'เนื้อหาควรมีอย่างน้อย 10 ตัวอักษร',
            },
          }}
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

export default WoundForm;
