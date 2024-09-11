import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
import ImageUpload from 'components/input/ImageUpload';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import {
  createWound,
  getWoundImageUrl,
  updateWound,
} from 'services/woundService';
import COLORS from 'theme/colors';
import { WoundFormData } from 'types/AdminFormDataPostTypes';
import { WoundData } from 'types/AdminGetDataTypes';
import { showValidationError } from 'utils/ErrorFormToast';

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
      wound_name_en: '', // เพิ่มค่า wound_name_en
      wound_content: '',
      wound_note: '',
      ref: [{ value: '' }],
      wound_cover: null,
    },
  });

  const { fields, append, remove } = useFieldArray<WoundFormData>({
    control,
    name: 'ref',
  });

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setValue('wound_name', initialData.wound_name);
      setValue('wound_name_en', initialData.wound_name_en); // เซ็ตค่า wound_name_en
      setValue('wound_content', initialData.wound_content);
      if (initialData.wound_cover) {
        setPreviewImage(getWoundImageUrl(initialData.wound_cover));
      } else {
        setPreviewImage(null);
      }

      setValue(
        'ref',
        initialData.ref?.map((refItem) => ({ value: refItem.value })) || [
          { value: '' },
        ]
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

  const handleFormSubmit = (data: WoundFormData) => {
    // ใช้ wound_name เป็น wound_name_th
    const woundFormData = {
      ...data,
      wound_name_th: data.wound_name, // ตั้งค่า wound_name_th ให้เท่ากับ wound_name
    };

    const imageFile = woundFormData.wound_cover as unknown as File | null;
    if (imageFile) {
      mutation.mutate({ formData: woundFormData, image: imageFile });
    } else {
      toast.error('โปรดอัพโหลดรูปภาพ');
      setLoading(false);
    }
  };

  const handleFormError = (errors: any) => {
    showValidationError(errors); // เรียกฟังก์ชันเพื่อแสดง error
  };

  const handleClearImage = () => {
    setPreviewImage(null);
    setValue('wound_cover', null);
  };

  const handleImageUpload = (file: File | null) => {
    if (file) {
      // ตรวจสอบขนาดไฟล์
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 15) {
        toast.error('ขนาดรูปปกไม่ควรเกิน 15MB');
        return; // ไม่ดำเนินการอัปโหลดรูปภาพต่อ
      }

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
    <form onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
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
      <Box>
        <Typography variant="h6">รูปปก</Typography>
        <ImageUpload
          onImageUpload={handleImageUpload}
          previewImage={previewImage}
          onClearImage={handleClearImage}
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
