import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  trickName: string;
  trickContent: string;
};

type TrickFormProps = {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

const TrickForm: React.FC<TrickFormProps> = ({ onSubmit, onClose }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="trickName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="ชื่อเคล็ดไม่ลับ"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="trickContent"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="เนื้อหา"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" color="primary">
          บันทึก
        </Button>
      </Box>
    </form>
  );
};

export default TrickForm;
