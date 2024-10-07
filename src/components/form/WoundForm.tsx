import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField, Typography } from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
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
import COLORS from 'themes/colors';
import { WoundFormData } from 'types/AdminFormDataPostTypes';
import { WoundData } from 'types/AdminGetDataTypes';
import { showValidationError } from 'utils/ErrorFormToast';

import ImageUploadWound from '@/components/input/ImageUploadWound';

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
    defaultValues: {
      wound_name: '',
      wound_name_en: '',
      wound_content: '',
      wound_note: '',
      ref: [{ value: '' }],
      wound_video: [{ value: '' }],
      wound_cover: [],
    },
  });

  const {
    fields: refFields,
    append: appendRef,
    remove: removeRef,
  } = useFieldArray<WoundFormData>({
    control,
    name: 'ref',
  });

  // เพิ่ม useFieldArray สำหรับ wound_video
  const {
    fields: videoFields,
    append: appendVideo,
    remove: removeVideo,
  } = useFieldArray<WoundFormData>({
    control,
    name: 'wound_video',
  });

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<number[]>([]);

  useEffect(() => {
    if (initialData) {
      setValue('wound_name', initialData.wound_name);
      setValue('wound_name_en', initialData.wound_name_en);
      setValue('wound_content', initialData.wound_content);

      if (initialData.wound_covers) {
        setPreviewImages(
          initialData.wound_covers.map((cover) => getWoundImageUrl(cover.url))
        );
      } else {
        setPreviewImages([]);
      }

      setValue('wound_note', initialData.wound_note);

      // เช็คและรีเซ็ตข้อมูล ref และ wound_video
      reset({
        ref:
          initialData.ref && Array.isArray(initialData.ref)
            ? initialData.ref.map((refItem) => ({ value: refItem.value }))
            : [{ value: '' }], // ถ้าไม่มีข้อมูล ให้สร้างค่าเริ่มต้นเป็น array ว่าง
        wound_video:
          initialData.wound_video && Array.isArray(initialData.wound_video)
            ? initialData.wound_video.map((woundVideoItem) => ({
                value: woundVideoItem.value,
              }))
            : [{ value: '' }], // ถ้าไม่มีข้อมูล wound_video ให้สร้างค่าเริ่มต้นเป็น array ว่าง
        wound_name: initialData.wound_name,
        wound_name_en: initialData.wound_name_en,
        wound_content: initialData.wound_content,
        wound_note: initialData.wound_note,
        wound_cover: [], // ตั้งค่าเริ่มต้นเป็น array ว่าง
      });
    }
  }, [initialData, setValue, reset]);

  const mutation = useMutation(
    (data: {
      formData: WoundFormData;
      images: File[];
      removedImages?: number[];
    }) => {
      return initialData
        ? updateWound(
            initialData.id,
            data.formData,
            data.images,
            data.removedImages
          )
        : createWound(data.formData, data.images);
    },
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

  // ฟังก์ชันจัดการลบรูปภาพ
  const handleClearImage = (index: number) => {
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);

    if (initialData?.wound_covers && index < initialData.wound_covers.length) {
      const imageIdToRemove = initialData.wound_covers[index]?.id;
      if (imageIdToRemove) {
        setRemovedImages((prev) => [...prev, imageIdToRemove]);
      }
    } else {
      const uploadedFileIndex =
        index - (initialData?.wound_covers?.length || 0);
      const updatedUploadedFiles = [...uploadedFiles];
      updatedUploadedFiles.splice(uploadedFileIndex, 1);
      setUploadedFiles(updatedUploadedFiles);
    }
  };

  const handleImageUpload = (files: File[]) => {
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]); // รวมรูปภาพพรีวิวใหม่
    setUploadedFiles([...uploadedFiles, ...files]); // เก็บไฟล์ที่อัปโหลดใหม่
  };

  const handleFormSubmit = (data: WoundFormData) => {
    const woundFormData = {
      ...data,
      wound_name_th: data.wound_name,
    };
    const imageFiles = uploadedFiles;

    // กรองเฉพาะภาพที่ id ไม่เป็น undefined
    const keepImages = previewImages.filter((img, index) => {
      const imageId = initialData?.wound_covers[index]?.id;
      return imageId !== undefined && !removedImages.includes(imageId); // ตรวจสอบว่า imageId ไม่เป็น undefined ก่อน
    });

    if (imageFiles.length > 0 || keepImages.length > 0) {
      mutation.mutate({
        formData: woundFormData,
        images: imageFiles,
        removedImages,
      });
    } else {
      toast.error('โปรดอัพโหลดรูปภาพ');
      setLoading(false);
    }
  };

  const handleFormError = (errors: any) => {
    showValidationError(errors);
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
      <Box>
        <Typography variant="h6">รูปปก</Typography>
        <ImageUploadWound
          onImageUpload={handleImageUpload}
          previewImages={previewImages}
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
        {refFields.map((item, index) => (
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
              onClick={() => removeRef(index)}
              disabled={refFields.length === 1}
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
        <Box display="flex" alignItems="center" pb={2}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => appendRef({ value: '' })}
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

      <Box>
        <Typography variant="h6" mb={2}>
          เพิ่มลิงก์วีดีโอวิธีการรักษา
        </Typography>
        {videoFields.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <Controller
              name={`wound_video.${index}.value`} // เปลี่ยนจาก ref เป็น wound_video
              control={control}
              defaultValue={item.value}
              rules={{
                required: 'โปรดป้อนลิงก์วีดีโอ',
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
                  placeholder="ป้อนลิงก์วีดีโอ"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Button
              onClick={() => removeVideo(index)} // ใช้ removeVideo แทน removeRef
              disabled={videoFields.length === 1}
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
            onClick={() => appendVideo({ value: '' })}
            sx={{
              bgcolor: COLORS.blue[6],
              color: 'white',
              '&:hover': {
                bgcolor: COLORS.blue[6],
              },
            }}
          >
            เพิ่มลิงก์วีดีโอ
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
