import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  didyouknowName: string;
  didyouknowContent: string;
};

type DidyouknowFormProps = {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

const DidyouknowForm: React.FC<DidyouknowFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="didyouknowName"
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
        name="didyouknowContent"
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

export default DidyouknowForm;
