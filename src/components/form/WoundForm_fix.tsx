import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import ImageUpload from 'components/input/imageUpload_fix';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import { WoundFormDataMulti } from 'types/AdminFormDataPostTypes';
import { WoundDataMulti } from 'types/AdminGetDataTypes';

import CustomButtonSave from '@/components/button/CustomButtonSave';
import { createWounds, updateWounds } from '@/services/woundService';
import COLORS from '@/themes/colors';
import { showValidationError } from '@/utils/ErrorFormToast';

// Dynamically import TinyMCEEditor with SSR disabled
const TinyMCEEditor = dynamic(() => import('components/editor/TinyMCEEditor'), {
  ssr: false, // Disable server-side rendering
});

type WoundFormProps = {
  onCloseDrawer: () => void;
  initialData?: WoundDataMulti | null;
};

const MAX_IMAGES = 6;

const WoundForm: React.FC<WoundFormProps> = ({
  onCloseDrawer,
  initialData,
}) => {
  const { control, handleSubmit, reset, setValue } =
    useForm<WoundFormDataMulti>({
      defaultValues: initialData || {
        wound_name: '',
        wound_name_en: '',
        wound_content: '',
        wound_note: '',
        ref: [{ value: '' }],
        wound_cover: [],
      },
    });

  const { fields, append, remove } = useFieldArray<WoundFormDataMulti>({
    control,
    name: 'ref',
  });

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    if (initialData) {
      setValue('wound_name', initialData.wound_name);
      setValue('wound_name_en', initialData.wound_name_en);
      setValue('wound_content', initialData.wound_content);
      setValue('wound_note', initialData.wound_note);

      // ตรวจสอบว่า wound_cover เป็น array หรือไม่
      setValue(
        'wound_cover',
        Array.isArray(initialData.wound_cover) ? initialData.wound_cover : []
      );

      setValue('ref', initialData.ref || [{ value: '' }]);
    }
  }, [initialData, setValue]);

  const mutation = useMutation(
    initialData
      ? (data: { formData: WoundFormDataMulti; images: File[] }) =>
          updateWounds(
            initialData.id.toString(),
            data.formData,
            data.images || [] // ใช้ array ของไฟล์
          )
      : (data: { formData: WoundFormDataMulti; images: File[] }) =>
          createWounds(data.formData, data.images), // ส่ง array ของไฟล์หลายๆ ภาพ
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
        queryClient.invalidateQueries('wounds');
        queryClient.refetchQueries('wounds');
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

  const handleFormSubmit = async (data: WoundFormDataMulti) => {
    const woundFormData = {
      ...data,
      wound_name_th: data.wound_name,
    };

    if (imageFiles.length > 0) {
      mutation.mutate({ formData: woundFormData, images: imageFiles });
    } else {
      toast.error('โปรดอัปโหลดรูปภาพ');
      setLoading(false);
    }
  };

  const handleFormError = (errors: any) => {
    showValidationError(errors); // เรียกฟังก์ชันเพื่อแสดง error
  };

  const handleClearImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);

    // อัปเดต wound_cover หลังจากลบรูป
    setValue('wound_cover', updatedImages);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
      <Box mb={2}>
        <Typography variant="h6">ชื่อแผล</Typography>
        <Controller
          name="wound_name"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนชื่อแผล',
            pattern: {
              value: /^[\u0E00-\u0E7F\s]+$/,
              message: 'โปรดป้อนเฉพาะอักษรภาษาไทย',
            },
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

      {/* ชื่อแผลภาษาอังกฤษ */}
      <Box mb={2}>
        <Typography variant="h6">ชื่อแผล (ภาษาอังกฤษ)</Typography>
        <Controller
          name="wound_name_en"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนชื่อแผลภาษาอังกฤษ',
            pattern: {
              value: /^[A-Za-z\s]+$/, // อนุญาตเฉพาะตัวอักษร A-Z และช่องว่าง
              message: 'โปรดป้อนเฉพาะอักษรภาษาอังกฤษ',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              placeholder="ป้อนชื่อแผลภาษาอังกฤษ"
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
      {/* รูปปก */}
      <Box mb={2}>
        <Typography variant="h6">รูปปก</Typography>
        <ImageUpload
          onImageUpload={(files) => {
            setImageFiles((prevFiles) => [...prevFiles, ...files]); // รวมไฟล์ใหม่เข้ากับไฟล์ที่มีอยู่
            setPreviewImages((prevImages) => [
              ...prevImages,
              ...files.map((file) => URL.createObjectURL(file)),
            ]); // อัปเดต URL สำหรับพรีวิว
          }}
          onClearImage={handleClearImage}
          maxImages={MAX_IMAGES}
          currentImages={previewImages}
        />
      </Box>
      {/* เนื้อหา */}
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

      {/* สรุปเนื้อหา */}
      <Box>
        <Typography variant="h6">สรุปเนื้อหา</Typography>
        <Controller
          name="wound_note"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนสรุปเนื้อหา',
            minLength: {
              value: 10,
              message: 'สรุปเนื้อหาควรมีอย่างน้อย 10 ตัวอักษร',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              placeholder="ป้อนสรุปเนื้อหา"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>

      {/* แหล่งอ้างอิง */}
      <Box>
        <Typography variant="h6" mb={2}>
          แหล่งอ้างอิง
        </Typography>
        {fields.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <Controller
              name={`ref.${index}.value`}
              control={control}
              defaultValue={item.value}
              rules={{
                required: 'โปรดป้อนแหล่งอ้างอิง',
                pattern: {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: 'โปรดป้อนรูปแบบลิงก์หรือ URL ที่ถูกต้อง',
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="ป้อนแหล่งอ้างอิง"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Button
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              sx={{
                minWidth: 'auto',
                p: 1,
                ml: 1,
                color: 'error.main',
                bgcolor: 'transparent',
                border: 'none',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <FaRegTrashAlt />
            </Button>
          </Box>
        ))}
        <Box display="flex" alignItems="center">
          <Button
            startIcon={<AddIcon />}
            onClick={() => append({ value: '' })}
            sx={{
              bgcolor: COLORS.blue[6],
              color: 'white',
              '&:hover': {
                bgcolor: COLORS.blue[6],
              },
            }}
          >
            เพิ่มแหล่งอ้างอิง
          </Button>
        </Box>
      </Box>
      {/* ปุ่มบันทึก */}
      <Box mt={10} display="flex" justifyContent="flex-end">
        <CustomButtonSave variant="contained" color="primary" loading={loading}>
          บันทึก
        </CustomButtonSave>
      </Box>
    </form>
  );
};

export default WoundForm;
