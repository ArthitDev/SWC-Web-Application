import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
  woundName: string;
  woundContent: string;
};

type WoundFormProps = {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
};

const WoundForm: React.FC<WoundFormProps> = ({ onSubmit, onClose }) => {
  const { control, handleSubmit, reset } = useForm<FormData>();

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset(); // Reset the form fields after submission
    onClose(); // Close the drawer after submission
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="woundName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="ชื่อแผล"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="woundContent"
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

export default WoundForm;
