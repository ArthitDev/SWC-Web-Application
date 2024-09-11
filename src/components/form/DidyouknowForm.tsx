import { Box, TextField, Typography } from '@mui/material';
import CustomButtonSave from 'components/button/CustomButtonSave';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { createDidyouknow, updateDidyouknow } from 'services/didyouknowService';
import { DidyouknowFormData } from 'types/AdminFormDataPostTypes';
import { DidyouknowData } from 'types/AdminGetDataTypes';
import { showValidationError } from 'utils/ErrorFormToast';

type DidyouknowFormProps = {
  onCloseDrawer: () => void;
  initialData?: DidyouknowData | null;
};

const DidyouknowForm: React.FC<DidyouknowFormProps> = ({
  onCloseDrawer,
  initialData,
}) => {
  const { control, handleSubmit, setValue } = useForm<DidyouknowFormData>({
    defaultValues: initialData || {
      didyouknow_name: '',
      didyouknow_content: '',
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    initialData
      ? (data: DidyouknowFormData) => updateDidyouknow(initialData.id, data)
      : createDidyouknow,
    {
      onMutate: () => {
        toast.loading('กำลังบันทึกข้อมูล...');
      },
      onSuccess: () => {
        toast.dismiss();
        toast.success(
          initialData ? 'แก้ไขรู้หรือไม่ สำเร็จ!' : 'รู้หรือไม่ถูกสร้างสำเร็จ!'
        );
        onCloseDrawer();
        queryClient.invalidateQueries('didyouknow');
      },
      onError: () => {
        toast.dismiss();
        toast.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      },
    }
  );

  useEffect(() => {
    if (initialData) {
      setValue('didyouknow_name', initialData.didyouknow_name);
      setValue('didyouknow_content', initialData.didyouknow_content);
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: DidyouknowFormData) => {
    mutation.mutate(data);
  };

  const handleFormError = (errors: any) => {
    showValidationError(errors); // เรียกฟังก์ชันเพื่อแสดง error
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit, handleFormError)}>
      <Box>
        <Typography variant="h6">ชื่อรู้หรือไม่</Typography>
        <Controller
          name="didyouknow_name"
          control={control}
          defaultValue=""
          rules={{
            required: 'โปรดป้อนชื่อรู้หรือไม่',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              placeholder="ป้อนชื่อรู้หรือไม่"
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
          name="didyouknow_content"
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

export default DidyouknowForm;
