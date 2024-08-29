import { Box, TextField, Typography } from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { createTrick, updateTrick } from 'services/trickService';
import { TrickFormData } from 'types/AdminFormDataPostTypes';
import { TrickData } from 'types/AdminGetDataTypes';

type TrickFormProps = {
  onCloseDrawer: () => void;
  initialData?: TrickData | null;
};

const TrickForm: React.FC<TrickFormProps> = ({
  onCloseDrawer,
  initialData,
}) => {
  const { control, handleSubmit, setValue } = useForm<TrickFormData>({
    defaultValues: initialData || {
      trick_name: '',
      trick_content: '',
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    initialData
      ? (data: TrickFormData) => updateTrick(initialData.id, data)
      : createTrick,
    {
      onMutate: () => {
        toast.loading('กำลังบันทึกข้อมูล...');
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success(
          initialData ? 'แก้ไขเคล็ดไม่ลับสำเร็จ!' : 'เคล็ดไม่ลับถูกสร้างสำเร็จ!'
        );
        onCloseDrawer();
        queryClient.invalidateQueries('trick');
      },
      onError: () => {
        toast.dismiss();
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      },
    }
  );

  useEffect(() => {
    if (initialData) {
      setValue('trick_name', initialData.trick_name);
      setValue('trick_content', initialData.trick_content);
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: TrickFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Toaster />
      <Box>
        <Typography variant="h6">ชื่อเคล็ดไม่ลับ</Typography>
        <Controller
          name="trick_name"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนชื่อเคล็ดไม่ลับ',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              placeholder="ป้อนชื่อเคล็ดไม่ลับ"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="h6">เนื้อหา</Typography>
        <Controller
          name="trick_content"
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
      <Box mt={3} display="flex" justifyContent="flex-end">
        <CustomButtonSave
          variant="contained"
          color="primary"
          loading={mutation.isLoading}
        >
          {initialData ? 'บันทึกการแก้ไข' : 'บันทึก'}
        </CustomButtonSave>
      </Box>
    </form>
  );
};

export default TrickForm;
