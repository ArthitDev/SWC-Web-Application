import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  articlesName: string;
  articlesContent: string;
};

type ArticlesFormProps = {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

const ArticlesForm: React.FC<ArticlesFormProps> = ({ onSubmit, onClose }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="articlesName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="ชื่อบทความ"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="articlesContent"
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

export default ArticlesForm;
