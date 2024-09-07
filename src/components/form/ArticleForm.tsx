import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
import ImageUpload from 'components/input/ImageUpload';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
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
      article_note: '',
      ref: [{ value: '' }],
      article_cover: null,
      category: '',
    },
  });

  const { fields, append, remove } = useFieldArray<ArticleFormData>({
    control,
    name: 'ref',
  });

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setValue('article_name', initialData.article_name);
      setValue('article_content', initialData.article_content);
      setValue('category', initialData.category || '');
      if (initialData.article_cover) {
        setPreviewImage(getArticleImageUrl(initialData.article_cover));
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
        queryClient.invalidateQueries('articles');
        queryClient.refetchQueries('articles');
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
        <Typography variant="h6">สรุปเนื้อหา</Typography>
        <Controller
          name="article_note"
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

      <Box mb={2} mt={3}>
        <Typography variant="h6">หมวดหมู่</Typography>
        <FormControl fullWidth margin="normal" sx={{ maxWidth: 200 }}>
          <Controller
            name="category"
            control={control}
            rules={{ required: 'โปรดเลือกหมวดหมู่' }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  displayEmpty
                  inputProps={{ 'aria-label': 'หมวดหมู่' }}
                  sx={{
                    height: 40,
                    '.MuiSelect-select': {
                      paddingTop: '8px',
                      paddingBottom: '8px',
                    },
                    borderColor: fieldState.invalid ? 'error.main' : 'default',
                  }}
                  error={fieldState.invalid}
                >
                  <MenuItem value="" disabled>
                    เลือกหมวดหมู่
                  </MenuItem>
                  <MenuItem value="การแพทย์">การแพทย์</MenuItem>
                  <MenuItem value="เทคโนโลยี">เทคโนโลยี</MenuItem>
                  <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
                </Select>
                {fieldState.error && (
                  <Typography variant="caption" color="error">
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />
        </FormControl>
      </Box>

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

      <Box mt={10} display="flex" justifyContent="flex-end">
        <CustomButtonSave variant="contained" color="primary" loading={loading}>
          บันทึก
        </CustomButtonSave>
      </Box>
    </form>
  );
};

export default ArticleForm;
